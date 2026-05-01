package com.studysyncai.controller;

import com.studysyncai.dto.StudyPlanRequest;
import com.studysyncai.dto.StudyPlanResponse;
import com.studysyncai.security.UserPrincipal;
import com.studysyncai.service.StudyPlanService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/study-plans")
public class StudyPlanController {
    private final StudyPlanService studyPlanService;

    public StudyPlanController(StudyPlanService studyPlanService) {
        this.studyPlanService = studyPlanService;
    }

    @GetMapping
    public List<StudyPlanResponse> list(@AuthenticationPrincipal UserPrincipal principal,
                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return studyPlanService.list(principal.getId(), date);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudyPlanResponse create(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody StudyPlanRequest request) {
        return studyPlanService.create(principal.getId(), request);
    }

    @PutMapping("/{id}")
    public StudyPlanResponse update(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id,
                                    @Valid @RequestBody StudyPlanRequest request) {
        return studyPlanService.update(principal.getId(), id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        studyPlanService.delete(principal.getId(), id);
    }
}
