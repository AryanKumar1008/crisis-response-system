const priorityConfig = {
  critical: { color: 'var(--accent-red)', label: 'CRITICAL' },
  high: { color: 'var(--accent-orange)', label: 'HIGH' },
  medium: { color: 'var(--accent-yellow)', label: 'MEDIUM' },
};

const statusConfig = {
  active: { color: 'var(--accent-red)', label: 'Active', icon: '🔴' },
  responding: { color: 'var(--accent-orange)', label: 'Responding', icon: '🟠' },
  resolved: { color: 'var(--accent-green)', label: 'Resolved', icon: '🟢' },
};

const typeIcons = {
  medical: '🏥',
  fire: '🔥',
  security: '🔒',
  other: '⚠️',
};

export default function IncidentCard({ incident, onStatusChange, showControls = false }) {
  const priority = priorityConfig[incident.priority] || priorityConfig.medium;
  const status = statusConfig[incident.status] || statusConfig.active;

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m ago`;
  };

  return (
    <div className={`incident-card incident-card--${incident.status}`} data-priority={incident.priority}>
      <div className="incident-card-header">
        <span className="incident-type-icon">{typeIcons[incident.type] || '⚠️'}</span>
        <div className="incident-meta">
          <span className="incident-priority" style={{ color: priority.color }}>
            {priority.label}
          </span>
          <span className="incident-time">{timeAgo(incident.createdAt)}</span>
        </div>
        <span className="incident-status-badge" style={{ background: status.color }}>
          {status.icon} {status.label}
        </span>
      </div>

      <div className="incident-card-body">
        <h4 className="incident-title">
          {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Emergency
        </h4>
        <div className="incident-details">
          <span>👤 {incident.guestName}</span>
          <span>🚪 Room {incident.roomNumber}</span>
          <span>📍 {incident.location}</span>
        </div>
        {incident.description && (
          <p className="incident-description">{incident.description}</p>
        )}
      </div>

      {showControls && incident.status !== 'resolved' && (
        <div className="incident-card-actions">
          {incident.status === 'active' && (
            <button
              className="btn-respond"
              onClick={() => onStatusChange(incident.id, 'responding')}
            >
              🏃 Respond
            </button>
          )}
          {incident.status === 'responding' && (
            <button
              className="btn-resolve"
              onClick={() => onStatusChange(incident.id, 'resolved')}
            >
              ✅ Resolve
            </button>
          )}
        </div>
      )}
    </div>
  );
}
