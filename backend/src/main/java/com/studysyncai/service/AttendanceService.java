package com.studysyncai.service;

import com.studysyncai.dto.AttendanceRequest;
import com.studysyncai.dto.AttendanceResponse;
import com.studysyncai.entity.Attendance;
import com.studysyncai.exception.BadRequestException;
import com.studysyncai.repository.AttendanceRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final UserService userService;

    public AttendanceService(AttendanceRepository attendanceRepository, UserService userService) {
        this.attendanceRepository = attendanceRepository;
        this.userService = userService;
    }

    public List<AttendanceResponse> list(Long userId) {
        return attendanceRepository.findByUserIdOrderBySubjectNameAsc(userId).stream().map(AttendanceResponse::from).toList();
    }

    public AttendanceResponse create(Long userId, AttendanceRequest request) {
        if (request.getAttendedClasses() > request.getTotalClasses()) {
            throw new BadRequestException("Attended classes cannot exceed total classes");
        }
        Attendance attendance = new Attendance();
        attendance.setUser(userService.requireUser(userId));
        attendance.setSubjectName(request.getSubjectName());
        attendance.setAttendedClasses(request.getAttendedClasses());
        attendance.setTotalClasses(request.getTotalClasses());
        attendance.setPercentage(round((request.getAttendedClasses() * 100.0) / request.getTotalClasses()));
        return AttendanceResponse.from(attendanceRepository.save(attendance));
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
