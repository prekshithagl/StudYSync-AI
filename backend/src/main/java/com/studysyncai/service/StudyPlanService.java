package com.studysyncai.service;

import com.studysyncai.dto.StudyPlanRequest;
import com.studysyncai.dto.StudyPlanResponse;
import com.studysyncai.entity.StudyPlan;
import com.studysyncai.exception.ResourceNotFoundException;
import com.studysyncai.repository.StudyPlanRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final UserService userService;

    public StudyPlanService(StudyPlanRepository studyPlanRepository, UserService userService) {
        this.studyPlanRepository = studyPlanRepository;
        this.userService = userService;
    }

    public List<StudyPlanResponse> list(Long userId, LocalDate date) {
        List<StudyPlan> plans = date == null
                ? studyPlanRepository.findByUserIdOrderByStudyDateAsc(userId)
                : studyPlanRepository.findByUserIdAndStudyDateOrderByIdDesc(userId, date);
        return plans.stream().map(StudyPlanResponse::from).toList();
    }

    public StudyPlanResponse create(Long userId, StudyPlanRequest request) {
        StudyPlan plan = new StudyPlan();
        plan.setUser(userService.requireUser(userId));
        apply(plan, request);
        return StudyPlanResponse.from(studyPlanRepository.save(plan));
    }

    public StudyPlanResponse update(Long userId, Long id, StudyPlanRequest request) {
        StudyPlan plan = owned(userId, id);
        apply(plan, request);
        return StudyPlanResponse.from(studyPlanRepository.save(plan));
    }

    public void delete(Long userId, Long id) {
        studyPlanRepository.delete(owned(userId, id));
    }

    private void apply(StudyPlan plan, StudyPlanRequest request) {
        plan.setSubjectName(request.getSubjectName());
        plan.setStudyDate(request.getStudyDate());
        plan.setDurationHours(request.getDurationHours());
        plan.setStatus(request.getStatus());
    }

    private StudyPlan owned(Long userId, Long id) {
        StudyPlan plan = studyPlanRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Study plan not found"));
        if (!plan.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Study plan not found");
        }
        return plan;
    }
}
