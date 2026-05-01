import { useEffect, useMemo, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import MetricCard from '../components/MetricCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useToast } from '../context/ToastContext.jsx';
import api from '../services/api.js';
import { chartData } from '../utils/charts.js';

export default function Performance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ subjectName: '', marks: 80, examType: 'Internal' });
  const { notify } = useToast();
  const average = useMemo(() => records.length ? Math.round(records.reduce((sum, item) => sum + item.marks, 0) / records.length) : 0, [records]);

  const load = async () => setRecords((await api.get('/performance')).data);
  useEffect(() => { load(); }, []);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/performance', form);
    notify('Performance entry added');
    setForm({ subjectName: '', marks: 80, examType: 'Internal' });
    load();
  };

  const items = records.map((item) => ({ label: `${item.subjectName} (${item.examType})`, value: item.performanceScore }));

  return (
    <section className="page">
      <PageHeader eyebrow="Performance" title="Subject performance analytics" />
      <div className="metrics-grid compact"><MetricCard icon="bi-award" label="Average Marks" value={`${average}%`} tone="violet" /></div>
      <div className="two-column">
        <form className="panel form-panel" onSubmit={submit}>
          <h2>Add marks</h2>
          <label>Subject<input value={form.subjectName} onChange={(e) => setForm({ ...form, subjectName: e.target.value })} required /></label>
          <label>Marks<input type="number" min="0" max="100" value={form.marks} onChange={(e) => setForm({ ...form, marks: Number(e.target.value) })} required /></label>
          <label>Exam Type<input value={form.examType} onChange={(e) => setForm({ ...form, examType: e.target.value })} required /></label>
          <button className="primary-button">Save Marks</button>
        </form>
        <div className="panel"><h2>Score chart</h2><Bar data={chartData(items, 'Marks')} /></div>
      </div>
      <div className="panel"><h2>Performance progress</h2><Line data={chartData(items, 'Performance Score')} /></div>
    </section>
  );
}
