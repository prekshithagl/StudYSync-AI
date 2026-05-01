# StudySync AI - Smart Study Planner & Productivity Tracker

StudySync AI is a Java full stack productivity platform for students. It includes JWT authentication, a study planner, task management, attendance tracking, Pomodoro focus sessions, subject performance analytics, and a modern responsive React dashboard.

## Features

- User registration, login, logout, BCrypt password hashing, and JWT session persistence
- Protected Spring Boot REST APIs with user-owned data access
- Dashboard cards for study hours, pending tasks, completed tasks, attendance, and productivity score
- Chart.js analytics for weekly study hours, task split, attendance, and performance
- Study planner with date filtering, today's schedule, edit, delete, and completion status
- Task manager with search, priority, pagination, status updates, edit, and delete
- Attendance tracker with subject-wise and overall percentage plus below-75 percent warnings
- Subject performance tracker with marks, exam type, average marks, and charts
- Frontend-only Pomodoro timer with focus session count and daily focus time
- Profile update page

## Tech Stack

Backend: Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, Hibernate, Maven  
Frontend: React, React Router DOM, Axios, Chart.js, Bootstrap Icons, Vite  
Database: MySQL

## Project Structure

```text
StudySync-AI/
  backend/
    src/main/java/com/studysyncai/
      config/
      controller/
      dto/
      entity/
      exception/
      repository/
      security/
      service/
  frontend/
    src/
      components/
      context/
      layouts/
      pages/
      routes/
      services/
      utils/
```

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE studysync_ai;
```

Update `backend/src/main/resources/application.properties` with your MySQL username and password.

Hibernate uses `spring.jpa.hibernate.ddl-auto=update`, so the tables are created automatically when the backend starts.

## Backend Setup

```bash
cd StudySync-AI/backend
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

## Frontend Setup

```bash
cd StudySync-AI/frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## API Details

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`

Study Plans:

- `GET /api/study-plans`
- `GET /api/study-plans?date=2026-05-01`
- `POST /api/study-plans`
- `PUT /api/study-plans/{id}`
- `DELETE /api/study-plans/{id}`

Tasks:

- `GET /api/tasks?search=&page=0&size=8`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

Attendance:

- `GET /api/attendance`
- `POST /api/attendance`

Performance:

- `GET /api/performance`
- `POST /api/performance`

Dashboard and Profile:

- `GET /api/dashboard`
- `GET /api/profile`
- `PUT /api/profile`

Protected endpoints require:

```text
Authorization: Bearer <jwt-token>
```

## Screenshots

Add screenshots here after running the application:

- Home page
- Login/Register
- Dashboard
- Study Planner
- Tasks
- Attendance
- Performance
- Pomodoro Timer

## Notes for Interviews

This project demonstrates authentication, role-ready security, DTO usage, validation, exception handling, CRUD APIs, user data isolation, pagination, search, analytics, responsive React UI, and a clean full-stack project structure.
"# StudySync-AI-Smart-Study-Planner" 
