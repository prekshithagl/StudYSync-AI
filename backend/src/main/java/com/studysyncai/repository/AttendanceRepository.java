package com.studysyncai.repository;

import com.studysyncai.entity.Attendance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUserIdOrderBySubjectNameAsc(Long userId);
}
