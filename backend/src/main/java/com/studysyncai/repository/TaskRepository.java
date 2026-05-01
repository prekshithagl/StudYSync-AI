package com.studysyncai.repository;

import com.studysyncai.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByUserIdAndTaskTitleContainingIgnoreCaseOrderByDueDateAsc(Long userId, String taskTitle, Pageable pageable);
}
