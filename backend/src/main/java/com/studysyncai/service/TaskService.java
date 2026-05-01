package com.studysyncai.service;

import com.studysyncai.dto.TaskRequest;
import com.studysyncai.dto.TaskResponse;
import com.studysyncai.entity.Task;
import com.studysyncai.exception.ResourceNotFoundException;
import com.studysyncai.repository.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;

    public TaskService(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    public Page<TaskResponse> list(Long userId, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending().and(Sort.by("id").descending()));
        return taskRepository.findByUserIdAndTaskTitleContainingIgnoreCaseOrderByDueDateAsc(userId, search == null ? "" : search, pageable)
                .map(TaskResponse::from);
    }

    public TaskResponse create(Long userId, TaskRequest request) {
        Task task = new Task();
        task.setUser(userService.requireUser(userId));
        apply(task, request);
        return TaskResponse.from(taskRepository.save(task));
    }

    public TaskResponse update(Long userId, Long id, TaskRequest request) {
        Task task = owned(userId, id);
        apply(task, request);
        return TaskResponse.from(taskRepository.save(task));
    }

    public void delete(Long userId, Long id) {
        taskRepository.delete(owned(userId, id));
    }

    private void apply(Task task, TaskRequest request) {
        task.setTaskTitle(request.getTaskTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());
    }

    private Task owned(Long userId, Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        if (!task.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Task not found");
        }
        return task;
    }
}
