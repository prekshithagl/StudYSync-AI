package com.studysyncai.controller;

import com.studysyncai.dto.ProfileUpdateRequest;
import com.studysyncai.dto.UserResponse;
import com.studysyncai.security.UserPrincipal;
import com.studysyncai.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserResponse profile(@AuthenticationPrincipal UserPrincipal principal) {
        return userService.profile(principal.getId());
    }

    @PutMapping
    public UserResponse update(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody ProfileUpdateRequest request) {
        return userService.updateProfile(principal.getId(), request);
    }
}
