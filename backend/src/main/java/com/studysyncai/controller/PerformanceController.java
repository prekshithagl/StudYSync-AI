package com.studysyncai.controller;

import com.studysyncai.dto.PerformanceRequest;
import com.studysyncai.dto.PerformanceResponse;
import com.studysyncai.security.UserPrincipal;
import com.studysyncai.service.PerformanceService;
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
@RequestMapping("/api/performance")
public class PerformanceController {
    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }

    @GetMapping
    public List<PerformanceResponse> list(@AuthenticationPrincipal UserPrincipal principal) {
        return performanceService.list(principal.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PerformanceResponse create(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody PerformanceRequest request) {
        return performanceService.create(principal.getId(), request);
    }
}
