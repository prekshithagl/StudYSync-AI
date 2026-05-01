package com.studysyncai.service;

import com.studysyncai.dto.PerformanceRequest;
import com.studysyncai.dto.PerformanceResponse;
import com.studysyncai.entity.Performance;
import com.studysyncai.repository.PerformanceRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PerformanceService {
    private final PerformanceRepository performanceRepository;
    private final UserService userService;

    public PerformanceService(PerformanceRepository performanceRepository, UserService userService) {
        this.performanceRepository = performanceRepository;
        this.userService = userService;
    }

    public List<PerformanceResponse> list(Long userId) {
        return performanceRepository.findByUserIdOrderBySubjectNameAsc(userId).stream().map(PerformanceResponse::from).toList();
    }

    public PerformanceResponse create(Long userId, PerformanceRequest request) {
        Performance performance = new Performance();
        performance.setUser(userService.requireUser(userId));
        performance.setSubjectName(request.getSubjectName());
        performance.setMarks(request.getMarks());
        performance.setExamType(request.getExamType());
        performance.setPerformanceScore(request.getMarks());
        return PerformanceResponse.from(performanceRepository.save(performance));
    }
}
