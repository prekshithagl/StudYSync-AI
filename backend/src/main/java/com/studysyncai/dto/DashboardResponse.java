package com.studysyncai.dto;

import java.util.List;
import java.util.Map;

public record DashboardResponse(
        double totalStudyHours,
        long pendingTasks,
        long completedTasks,
        double attendancePercentage,
        double productivityScore,
        List<Map<String, Object>> weeklyStudyHours,
        List<Map<String, Object>> taskSummary,
        List<Map<String, Object>> attendanceSummary,
        List<Map<String, Object>> performanceSummary
) {
}
