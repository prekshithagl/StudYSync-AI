package com.studysyncai.dto;

import com.studysyncai.entity.User;
import java.time.LocalDateTime;

public record UserResponse(Long id, String fullName, String email, String collegeName, String course, LocalDateTime createdAt) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getCollegeName(), user.getCourse(), user.getCreatedAt());
    }
}
