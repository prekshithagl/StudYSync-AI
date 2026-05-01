package com.studysyncai.dto;

import com.studysyncai.entity.PlanStatus;
import com.studysyncai.entity.StudyPlan;
import java.time.LocalDate;

public record StudyPlanResponse(Long id, String subjectName, LocalDate studyDate, double durationHours, PlanStatus status) {
    public static StudyPlanResponse from(StudyPlan plan) {
        return new StudyPlanResponse(plan.getId(), plan.getSubjectName(), plan.getStudyDate(), plan.getDurationHours(), plan.getStatus());
    }
}
