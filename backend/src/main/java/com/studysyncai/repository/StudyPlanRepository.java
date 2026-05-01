package com.studysyncai.repository;

import com.studysyncai.entity.StudyPlan;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyPlanRepository extends JpaRepository<StudyPlan, Long> {
    List<StudyPlan> findByUserIdOrderByStudyDateAsc(Long userId);
    List<StudyPlan> findByUserIdAndStudyDateOrderByIdDesc(Long userId, LocalDate studyDate);
}
