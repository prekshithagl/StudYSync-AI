package com.studysyncai.controller;

import com.studysyncai.dto.TaskRequest;
import com.studysyncai.dto.TaskResponse;
import com.studysyncai.security.UserPrincipal;
import com.studysyncai.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
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
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public Page<TaskResponse> list(@AuthenticationPrincipal UserPrincipal principal,
                                   @RequestParam(defaultValue = "") String search,
                                   @RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "8") int size) {
        return taskService.list(principal.getId(), search, page, size);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse create(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody TaskRequest request) {
        return taskService.create(principal.getId(), request);
    }

    @PutMapping("/{id}")
    public TaskResponse update(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id,
                               @Valid @RequestBody TaskRequest request) {
        return taskService.update(principal.getId(), id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        taskService.delete(principal.getId(), id);
    }
}
