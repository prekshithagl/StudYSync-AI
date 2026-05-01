export default function About() {
  const features = [
    ['JWT Authentication', 'Secure registration, login, and session persistence.'],
    ['Planner + Tasks', 'Organize daily plans, priorities, due dates, and progress.'],
    ['Attendance Insights', 'Subject-wise tracking with below-75 percent warnings.'],
    ['Charts Dashboard', 'Bar, pie, and line analytics for interview-ready reporting.']
  ];

  return (
    <section className="public-section">
      <span className="eyebrow">About</span>
      <h1>A full-stack student productivity platform</h1>
      <p>StudySync AI is designed as an internship-level Java full stack project with clean Spring Boot APIs, JWT security, MySQL persistence, and a modern React dashboard.</p>
      <div className="feature-grid">
        {features.map(([title, text]) => (
          <div className="feature-card" key={title}>
            <i className="bi bi-check-circle" />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
