package com.studysyncai.dto;

import com.studysyncai.entity.Performance;

public record PerformanceResponse(Long id, String subjectName, double marks, String examType, double performanceScore) {
    public static PerformanceResponse from(Performance performance) {
        return new PerformanceResponse(performance.getId(), performance.getSubjectName(), performance.getMarks(), performance.getExamType(), performance.getPerformanceScore());
    }
}
