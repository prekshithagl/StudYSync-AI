import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import EmptyState from '../components/EmptyState.jsx';
import Loading from '../components/Loading.jsx';
import MetricCard from '../components/MetricCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import api from '../services/api.js';
import { chartData } from '../utils/charts.js';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard').then(({ data }) => setDashboard(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="page">
      <PageHeader eyebrow="Dashboard" title="Your productivity cockpit" />
      <div className="metrics-grid">
        <MetricCard icon="bi-clock-history" label="Total Study Hours" value={`${dashboard.totalStudyHours}h`} />
        <MetricCard icon="bi-list-task" label="Pending Work" value={dashboard.pendingTasks} tone="amber" />
        <MetricCard icon="bi-check2-circle" label="Completed Tasks" value={dashboard.completedTasks} tone="teal" />
        <MetricCard icon="bi-shield-check" label="Attendance" value={`${dashboard.attendancePercentage}%`} tone="violet" />
        <MetricCard icon="bi-lightning-charge" label="Productivity Score" value={`${dashboard.productivityScore}%`} tone="rose" />
      </div>
      <div className="dashboard-grid">
        <div className="panel large"><h2>Weekly Study Hours</h2><Bar data={chartData(dashboard.weeklyStudyHours, 'Hours')} /></div>
        <div className="panel"><h2>Work Split</h2><Doughnut data={chartData(dashboard.taskSummary, 'Items')} /></div>
        <div className="panel"><h2>Attendance</h2>{dashboard.attendanceSummary.length ? <Bar data={chartData(dashboard.attendanceSummary, '%')} /> : <EmptyState title="No attendance yet" text="Add attendance records to unlock this chart." />}</div>
        <div className="panel"><h2>Performance Trend</h2>{dashboard.performanceSummary.length ? <Line data={chartData(dashboard.performanceSummary, 'Score')} /> : <EmptyState title="No marks yet" text="Add performance entries to see subject scores." />}</div>
      </div>
    </section>
  );
}
