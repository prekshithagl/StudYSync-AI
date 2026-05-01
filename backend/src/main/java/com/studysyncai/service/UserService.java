package com.studysyncai.service;

import com.studysyncai.dto.ProfileUpdateRequest;
import com.studysyncai.dto.UserResponse;
import com.studysyncai.entity.User;
import com.studysyncai.exception.ResourceNotFoundException;
import com.studysyncai.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User requireUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public UserResponse profile(Long userId) {
        return UserResponse.from(requireUser(userId));
    }

    public UserResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = requireUser(userId);
        user.setFullName(request.getFullName());
        user.setCollegeName(request.getCollegeName());
        user.setCourse(request.getCourse());
        return UserResponse.from(userRepository.save(user));
    }
}
