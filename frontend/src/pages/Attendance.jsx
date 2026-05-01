import { useEffect, useMemo, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import MetricCard from '../components/MetricCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useToast } from '../context/ToastContext.jsx';
import api from '../services/api.js';
import { chartData } from '../utils/charts.js';

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ subjectName: '', attendedClasses: 0, totalClasses: 1 });
  const { notify } = useToast();

  const load = async () => setRecords((await api.get('/attendance')).data);
  useEffect(() => { load(); }, []);

  const overall = useMemo(() => records.length ? Math.round(records.reduce((sum, item) => sum + item.percentage, 0) / records.length) : 0, [records]);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/attendance', form);
    notify('Attendance saved');
    setForm({ subjectName: '', attendedClasses: 0, totalClasses: 1 });
    load();
  };

  return (
    <section className="page">
      <PageHeader eyebrow="Attendance" title="Attendance tracker" />
      <div className="metrics-grid compact"><MetricCard icon="bi-percent" label="Overall Attendance" value={`${overall}%`} tone={overall < 75 ? 'rose' : 'teal'} /></div>
      <div className="two-column">
        <form className="panel form-panel" onSubmit={submit}>
          <h2>Add subject attendance</h2>
          <label>Subject<input value={form.subjectName} onChange={(e) => setForm({ ...form, subjectName: e.target.value })} required /></label>
          <label>Attended Classes<input type="number" min="0" value={form.attendedClasses} onChange={(e) => setForm({ ...form, attendedClasses: Number(e.target.value) })} required /></label>
          <label>Total Classes<input type="number" min="1" value={form.totalClasses} onChange={(e) => setForm({ ...form, totalClasses: Number(e.target.value) })} required /></label>
          <button className="primary-button">Save Attendance</button>
        </form>
        <div className="panel"><h2>Subject-wise attendance</h2><Bar data={chartData(records.map((r) => ({ label: r.subjectName, value: r.percentage })), 'Attendance %')} /></div>
      </div>
      <div className="panel">
        <h2>Attendance status</h2>
        {records.map((item) => (
          <div className="attendance-row" key={item.id}>
            <div><strong>{item.subjectName}</strong><small>{item.attendedClasses}/{item.totalClasses} classes</small></div>
            <div className="progress"><span style={{ width: `${Math.min(item.percentage, 100)}%` }} /></div>
            <strong className={item.percentage < 75 ? 'text-danger' : 'text-ok'}>{item.percentage}%</strong>
            {item.percentage < 75 && <span className="warning">Below 75%</span>}
          </div>
        ))}
        <div className="chart-small"><Doughnut data={chartData([{ label: 'Present', value: overall }, { label: 'Gap', value: Math.max(0, 100 - overall) }], 'Overall')} /></div>
      </div>
    </section>
  );
}
