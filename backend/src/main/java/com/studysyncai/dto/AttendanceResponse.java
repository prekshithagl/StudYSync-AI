package com.studysyncai.dto;

import com.studysyncai.entity.Attendance;

public record AttendanceResponse(Long id, String subjectName, int attendedClasses, int totalClasses, double percentage) {
    public static AttendanceResponse from(Attendance attendance) {
        return new AttendanceResponse(attendance.getId(), attendance.getSubjectName(), attendance.getAttendedClasses(), attendance.getTotalClasses(), attendance.getPercentage());
    }
}
