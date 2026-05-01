package com.studysyncai.dto;

import com.studysyncai.entity.Task;
import com.studysyncai.entity.TaskPriority;
import com.studysyncai.entity.TaskStatus;
import java.time.LocalDate;

public record TaskResponse(Long id, String taskTitle, String description, TaskPriority priority, TaskStatus status, LocalDate dueDate) {
    public static TaskResponse from(Task task) {
        return new TaskResponse(task.getId(), task.getTaskTitle(), task.getDescription(), task.getPriority(), task.getStatus(), task.getDueDate());
    }
}
