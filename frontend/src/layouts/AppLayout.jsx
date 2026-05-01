import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  ['Dashboard', '/dashboard', 'bi-grid-1x2-fill'],
  ['Study Planner', '/planner', 'bi-calendar2-week'],
  ['Tasks', '/tasks', 'bi-check2-square'],
  ['Attendance', '/attendance', 'bi-clipboard-data'],
  ['Performance', '/performance', 'bi-graph-up-arrow'],
  ['Pomodoro', '/pomodoro', 'bi-stopwatch'],
  ['Profile', '/profile', 'bi-person-circle']
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand app-brand"><span>StudySync</span> AI</div>
        <div className="sidebar-user">
          <div className="avatar">{user?.fullName?.charAt(0) || 'S'}</div>
          <div>
            <strong>{user?.fullName}</strong>
            <small>{user?.course}</small>
          </div>
        </div>
        <nav className="side-nav">
          {links.map(([label, to, icon]) => (
            <NavLink key={to} to={to}>
              <i className={`bi ${icon}`} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="ghost danger" onClick={handleLogout}><i className="bi bi-box-arrow-left" /> Logout</button>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="search">
            <i className="bi bi-search" />
            <input placeholder="Search your study workspace" />
          </div>
          <div className="top-actions">
            <button className="icon-button" title="Notifications"><i className="bi bi-bell" /></button>
            <NavLink to="/profile" className="profile-chip">{user?.fullName}</NavLink>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
