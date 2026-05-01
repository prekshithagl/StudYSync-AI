package com.studysyncai.repository;

import com.studysyncai.entity.Performance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    List<Performance> findByUserIdOrderBySubjectNameAsc(Long userId);
}
