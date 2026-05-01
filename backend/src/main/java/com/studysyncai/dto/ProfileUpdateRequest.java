package com.studysyncai.dto;

import jakarta.validation.constraints.NotBlank;

public class ProfileUpdateRequest {
    @NotBlank
    private String fullName;
    @NotBlank
    private String collegeName;
    @NotBlank
    private String course;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
}
