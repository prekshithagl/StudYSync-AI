import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const initial = { fullName: '', email: '', password: '', confirmPassword: '', collegeName: '', course: '' };

export default function Register() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      notify('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      notify('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      notify(error.response?.data?.message || 'Cannot connect to backend on port 8090', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card wide" onSubmit={submit}>
        <span className="eyebrow">Register</span>
        <h1>Create your student workspace</h1>
        <div className="form-grid">
          {[
            ['fullName', 'Full Name', 'text'],
            ['email', 'Email', 'email'],
            ['collegeName', 'College Name', 'text'],
            ['course', 'Course', 'text'],
            ['password', 'Password', 'password'],
            ['confirmPassword', 'Confirm Password', 'password']
          ].map(([name, label, type]) => (
            <label key={name}>{label}<input type={type} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} required /></label>
          ))}
        </div>
        <button className="primary-button" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
