import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">Smart Study Planner</span>
        <h1>StudySync AI</h1>
        <p>Plan study sessions, track tasks, measure attendance, and understand your productivity from one focused student dashboard.</p>
        <div className="hero-actions">
          <Link to="/register" className="primary-button">Start Planning</Link>
          <Link to="/about" className="secondary-button">View Features</Link>
        </div>
      </div>
      <div className="hero-panel">
        <div className="mini-card">
          <span>Productivity Score</span>
          <strong>87%</strong>
          <div className="progress"><span style={{ width: '87%' }} /></div>
        </div>
        <div className="hero-grid">
          <div><i className="bi bi-calendar-check" />Planner</div>
          <div><i className="bi bi-stopwatch" />Pomodoro</div>
          <div><i className="bi bi-bar-chart" />Analytics</div>
          <div><i className="bi bi-mortarboard" />Performance</div>
        </div>
      </div>
    </section>
  );
}
