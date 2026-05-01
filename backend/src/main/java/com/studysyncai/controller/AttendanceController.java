package com.studysyncai.controller;

import com.studysyncai.dto.AttendanceRequest;
import com.studysyncai.dto.AttendanceResponse;
import com.studysyncai.security.UserPrincipal;
import com.studysyncai.service.AttendanceService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public List<AttendanceResponse> list(@AuthenticationPrincipal UserPrincipal principal) {
        return attendanceService.list(principal.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AttendanceResponse create(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody AttendanceRequest request) {
        return attendanceService.create(principal.getId(), request);
    }
}
