import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

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
  const [search, setSearch] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then(({ data }) => setDashboard(data)).catch(() => setDashboard(null));
  }, []);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    return links.filter(([label]) => label.toLowerCase().includes(query));
  }, [search]);

  const notificationItems = useMemo(() => {
    if (!dashboard) return ['Dashboard data is not available yet'];
    const items = [];
    if (dashboard.pendingTasks > 0) items.push(`${dashboard.pendingTasks} pending work item${dashboard.pendingTasks === 1 ? '' : 's'}`);
    if (dashboard.completedTasks > 0) items.push(`${dashboard.completedTasks} completed work item${dashboard.completedTasks === 1 ? '' : 's'}`);
    if (dashboard.attendancePercentage < 75) items.push(`Attendance average is ${dashboard.attendancePercentage}%`);
    return items.length ? items : ['No new study alerts'];
  }, [dashboard]);

  const notificationCount = dashboard?.pendingTasks || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const [firstMatch] = searchResults;
    if (firstMatch) {
      navigate(firstMatch[1]);
      setSearch('');
      return;
    }
    if (search.trim()) {
      navigate('/tasks', { state: { search: search.trim() } });
      setSearch('');
    }
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
          <form className="search" onSubmit={handleSearch}>
            <i className="bi bi-search" />
            <input
              placeholder="Search your study workspace"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              list="workspace-search"
            />
            <datalist id="workspace-search">
              {links.map(([label]) => <option value={label} key={label} />)}
            </datalist>
          </form>
          <div className="top-actions">
            <div className="notification-wrap">
              <button className="icon-button notification-button" title="Notifications" onClick={() => setNotificationsOpen((open) => !open)}>
                <i className="bi bi-bell" />
                {notificationCount > 0 && <span>{notificationCount}</span>}
              </button>
              {notificationsOpen && (
                <div className="notification-menu">
                  <strong>Notifications</strong>
                  {notificationItems.map((item) => <p key={item}>{item}</p>)}
                  <button onClick={() => { setNotificationsOpen(false); navigate('/tasks'); }}>View tasks</button>
                </div>
              )}
            </div>
            <NavLink to="/profile" className="profile-chip">{user?.fullName}</NavLink>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
