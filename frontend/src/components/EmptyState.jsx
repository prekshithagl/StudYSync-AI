export default function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <i className="bi bi-stars" />
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
