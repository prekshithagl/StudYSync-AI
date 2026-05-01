import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import api from '../services/api.js';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ fullName: user.fullName, collegeName: user.collegeName, course: user.course });
  const { notify } = useToast();

  const submit = async (event) => {
    event.preventDefault();
    const { data } = await api.put('/profile', form);
    updateUser(data);
    notify('Profile updated');
  };

  return (
    <section className="page">
      <PageHeader eyebrow="Profile" title="Student profile" />
      <div className="two-column">
        <form className="panel form-panel" onSubmit={submit}>
          <h2>Update profile</h2>
          <label>Full Name<input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></label>
          <label>College Name<input value={form.collegeName} onChange={(e) => setForm({ ...form, collegeName: e.target.value })} required /></label>
          <label>Course<input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} required /></label>
          <button className="primary-button">Save Profile</button>
        </form>
        <div className="panel profile-panel">
          <div className="avatar big">{user.fullName?.charAt(0)}</div>
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          <div className="profile-lines">
            <span><strong>College</strong>{user.collegeName}</span>
            <span><strong>Course</strong>{user.course}</span>
            <span><strong>Joined</strong>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
