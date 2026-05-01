export default function MetricCard({ icon, label, value, tone = 'blue' }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric-icon"><i className={`bi ${icon}`} /></div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
