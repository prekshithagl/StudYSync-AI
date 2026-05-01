CREATE DATABASE IF NOT EXISTS studysync_ai;
USE studysync_ai;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    college_name VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'ROLE_USER',
    created_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS study_plans (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    study_date DATE NOT NULL,
    duration_hours DOUBLE NOT NULL,
    status ENUM('PENDING', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    PRIMARY KEY (id),
    CONSTRAINT fk_study_plans_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    task_title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    priority ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL DEFAULT 'MEDIUM',
    status ENUM('PENDING', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    due_date DATE,
    PRIMARY KEY (id),
    CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    attended_classes INT NOT NULL,
    total_classes INT NOT NULL,
    percentage DOUBLE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_attendance_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS performance (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    marks DOUBLE NOT NULL,
    exam_type VARCHAR(255) NOT NULL,
    performance_score DOUBLE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_performance_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_study_plans_user_date ON study_plans(user_id, study_date);
CREATE INDEX idx_tasks_user_title ON tasks(user_id, task_title);
CREATE INDEX idx_attendance_user_subject ON attendance(user_id, subject_name);
CREATE INDEX idx_performance_user_subject ON performance(user_id, subject_name);

-- Optional demo user.
-- Password is BCrypt hash for: password123
INSERT INTO users (full_name, email, password, college_name, course, role, created_at)
VALUES (
    'Demo Student',
    'demo@studysync.ai',
    '$2a$10$ZxS2RBV59E8Ow0MYl5rF8.V7Bfm1m4L1xraPZyi3HLxgl5FQfI8Ri',
    'Demo College',
    'BCA',
    'ROLE_USER',
    NOW(6)
)
ON DUPLICATE KEY UPDATE email = email;

INSERT INTO study_plans (user_id, subject_name, study_date, duration_hours, status)
SELECT id, 'Java', CURDATE(), 2, 'PENDING' FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE subject_name = subject_name;

INSERT INTO study_plans (user_id, subject_name, study_date, duration_hours, status)
SELECT id, 'DBMS', DATE_ADD(CURDATE(), INTERVAL 1 DAY), 3, 'COMPLETED' FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE subject_name = subject_name;

INSERT INTO tasks (user_id, task_title, description, priority, status, due_date)
SELECT id, 'Complete SQL assignment', 'Practice joins, grouping, and normalization questions.', 'HIGH', 'PENDING', DATE_ADD(CURDATE(), INTERVAL 2 DAY)
FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE task_title = task_title;

INSERT INTO tasks (user_id, task_title, description, priority, status, due_date)
SELECT id, 'Revise Spring Security', 'Revise JWT filter, security config, and BCrypt flow.', 'MEDIUM', 'COMPLETED', CURDATE()
FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE task_title = task_title;

INSERT INTO attendance (user_id, subject_name, attended_classes, total_classes, percentage)
SELECT id, 'Java', 18, 20, 90.0 FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE subject_name = subject_name;

INSERT INTO attendance (user_id, subject_name, attended_classes, total_classes, percentage)
SELECT id, 'DBMS', 12, 18, 66.7 FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE subject_name = subject_name;

INSERT INTO performance (user_id, subject_name, marks, exam_type, performance_score)
SELECT id, 'Java', 88, 'Internal', 88 FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE subject_name = subject_name;

INSERT INTO performance (user_id, subject_name, marks, exam_type, performance_score)
SELECT id, 'DBMS', 76, 'Mid Sem', 76 FROM users WHERE email = 'demo@studysync.ai'
ON DUPLICATE KEY UPDATE subject_name = subject_name;
