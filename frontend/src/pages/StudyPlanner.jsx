import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import PageHeader from '../components/PageHeader.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

const today = new Date().toISOString().slice(0, 10);
const blank = { subjectName: '', studyDate: today, durationHours: 1, status: 'PENDING' };

export default function StudyPlanner() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const { notify } = useToast();

  const load = async () => {
    const suffix = filterDate ? `?date=${filterDate}` : '';
    const { data } = await api.get(`/study-plans${suffix}`);
    setPlans(data);
  };

  useEffect(() => { load(); }, [filterDate]);

  const todaysPlans = useMemo(() => plans.filter((plan) => plan.studyDate === today), [plans]);

  const submit = async (event) => {
    event.preventDefault();
    editing ? await api.put(`/study-plans/${editing}`, form) : await api.post('/study-plans', form);
    notify(editing ? 'Study plan updated' : 'Study plan added');
    setForm(blank);
    setEditing(null);
    load();
  };

  const edit = (plan) => {
    setEditing(plan.id);
    setForm(plan);
  };

  const remove = async (id) => {
    await api.delete(`/study-plans/${id}`);
    notify('Study plan deleted');
    load();
  };

  return (
    <section className="page">
      <PageHeader eyebrow="Planner" title="Daily study planner">
        <input className="date-filter" type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </PageHeader>
      <div className="two-column">
        <form className="panel form-panel" onSubmit={submit}>
          <h2>{editing ? 'Edit plan' : 'Add study plan'}</h2>
          <label>Subject<input value={form.subjectName} onChange={(e) => setForm({ ...form, subjectName: e.target.value })} required /></label>
          <label>Study Date<input type="date" value={form.studyDate} onChange={(e) => setForm({ ...form, studyDate: e.target.value })} required /></label>
          <label>Duration Hours<input type="number" min="1" step="0.5" value={form.durationHours} onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })} required /></label>
          <label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>PENDING</option><option>COMPLETED</option></select></label>
          <button className="primary-button">{editing ? 'Update Plan' : 'Add Plan'}</button>
        </form>
        <div className="panel">
          <h2>Today's schedule</h2>
          {todaysPlans.length ? todaysPlans.map((plan) => <div className="schedule-item" key={plan.id}><strong>{plan.subjectName}</strong><span>{plan.durationHours}h</span></div>) : <EmptyState title="No plans today" text="Add a plan for today to structure your focus time." />}
        </div>
      </div>
      <div className="panel">
        <h2>All study plans</h2>
        <div className="table-list">
          {plans.map((plan) => (
            <div className="table-row" key={plan.id}>
              <div><strong>{plan.subjectName}</strong><small>{plan.studyDate} • {plan.durationHours}h</small></div>
              <span className={`status ${plan.status.toLowerCase()}`}>{plan.status}</span>
              <button className="icon-button" onClick={() => edit(plan)}><i className="bi bi-pencil" /></button>
              <button className="icon-button danger" onClick={() => remove(plan.id)}><i className="bi bi-trash" /></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
