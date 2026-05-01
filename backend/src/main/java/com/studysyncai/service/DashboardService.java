package com.studysyncai.service;

import com.studysyncai.dto.DashboardResponse;
import com.studysyncai.entity.Attendance;
import com.studysyncai.entity.Performance;
import com.studysyncai.entity.PlanStatus;
import com.studysyncai.entity.StudyPlan;
import com.studysyncai.entity.Task;
import com.studysyncai.entity.TaskStatus;
import com.studysyncai.repository.AttendanceRepository;
import com.studysyncai.repository.PerformanceRepository;
import com.studysyncai.repository.StudyPlanRepository;
import com.studysyncai.repository.TaskRepository;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    private final StudyPlanRepository studyPlanRepository;
    private final TaskRepository taskRepository;
    private final AttendanceRepository attendanceRepository;
    private final PerformanceRepository performanceRepository;

    public DashboardService(StudyPlanRepository studyPlanRepository, TaskRepository taskRepository,
                            AttendanceRepository attendanceRepository, PerformanceRepository performanceRepository) {
        this.studyPlanRepository = studyPlanRepository;
        this.taskRepository = taskRepository;
        this.attendanceRepository = attendanceRepository;
        this.performanceRepository = performanceRepository;
    }

    public DashboardResponse dashboard(Long userId) {
        List<StudyPlan> plans = studyPlanRepository.findByUserIdOrderByStudyDateAsc(userId);
        List<Task> tasks = taskRepository.findByUserIdAndTaskTitleContainingIgnoreCaseOrderByDueDateAsc(userId, "", PageRequest.of(0, 500)).getContent();
        List<Attendance> attendance = attendanceRepository.findByUserIdOrderBySubjectNameAsc(userId);
        List<Performance> performance = performanceRepository.findByUserIdOrderBySubjectNameAsc(userId);

        double totalStudyHours = plans.stream().filter(p -> p.getStatus() == PlanStatus.COMPLETED).mapToDouble(StudyPlan::getDurationHours).sum();
        long pendingStudyPlans = plans.stream().filter(p -> p.getStatus() == PlanStatus.PENDING).count();
        long pendingTasks = tasks.stream().filter(t -> t.getStatus() == TaskStatus.PENDING).count() + pendingStudyPlans;
        long completedTasks = tasks.stream().filter(t -> t.getStatus() == TaskStatus.COMPLETED).count();
        double attendancePercentage = attendance.stream().mapToDouble(Attendance::getPercentage).average().orElse(0);
        double completionRate = tasks.isEmpty() ? 0 : (completedTasks * 100.0 / tasks.size());
        double productivityScore = round((completionRate * 0.45) + (attendancePercentage * 0.25) + (Math.min(totalStudyHours, 40) / 40 * 30));

        return new DashboardResponse(
                round(totalStudyHours),
                pendingTasks,
                completedTasks,
                round(attendancePercentage),
                productivityScore,
                weeklyStudyHours(plans),
                List.of(Map.of("label", "Completed Tasks", "value", completedTasks), Map.of("label", "Pending Work", "value", pendingTasks)),
                attendance.stream().map(a -> Map.<String, Object>of("label", a.getSubjectName(), "value", a.getPercentage())).toList(),
                performance.stream().map(p -> Map.<String, Object>of("label", p.getSubjectName(), "value", p.getPerformanceScore())).toList());
    }

    private List<Map<String, Object>> weeklyStudyHours(List<StudyPlan> plans) {
        LocalDate today = LocalDate.now();
        Map<LocalDate, Double> hoursByDay = new LinkedHashMap<>();
        for (int i = 6; i >= 0; i--) {
            hoursByDay.put(today.minusDays(i), 0.0);
        }
        for (StudyPlan plan : plans) {
            if (hoursByDay.containsKey(plan.getStudyDate()) && plan.getStatus() == PlanStatus.COMPLETED) {
                hoursByDay.computeIfPresent(plan.getStudyDate(), (date, hours) -> hours + plan.getDurationHours());
            }
        }
        List<Map<String, Object>> result = new ArrayList<>();
        hoursByDay.forEach((date, hours) -> result.add(Map.of(
                "label", date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH),
                "value", round(hours))));
        return result;
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
