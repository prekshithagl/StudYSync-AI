package com.studysyncai.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

public class PerformanceRequest {
    @NotBlank
    private String subjectName;
    @DecimalMin("0")
    @DecimalMax("100")
    private double marks;
    @NotBlank
    private String examType;

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }
    public double getMarks() { return marks; }
    public void setMarks(double marks) { this.marks = marks; }
    public String getExamType() { return examType; }
    public void setExamType(String examType) { this.examType = examType; }
}
