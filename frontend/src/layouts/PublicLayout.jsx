import { NavLink, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <nav className="public-nav">
        <NavLink to="/" className="brand"><span>StudySync</span> AI</NavLink>
        <div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register" className="nav-cta">Register</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
