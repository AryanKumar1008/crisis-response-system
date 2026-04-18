import { useState, useEffect, useRef } from 'react';
import { getAlerts, resolveAlert } from '../services/api';

export default function StaffDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [newAlertIds, setNewAlertIds] = useState(new Set());
  const prevIdsRef = useRef(new Set());

  useEffect(() => {
    fetchAlerts();
    // Poll every 5 seconds
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const activeAlerts = await getAlerts();
      const currentFetchedIds = activeAlerts.map(a => a.id);

      let newlyAdded = [];
      if (prevIdsRef.current.size > 0) {
        newlyAdded = currentFetchedIds.filter(id => !prevIdsRef.current.has(id));
        if (newlyAdded.length > 0) {
          setNewAlertIds(prev => new Set([...prev, ...newlyAdded]));
          
          // Clear highlight after 5 seconds
          setTimeout(() => {
            setNewAlertIds(prev => {
              const updated = new Set(prev);
              newlyAdded.forEach(id => updated.delete(id));
              return updated;
            });
          }, 5000);
        }
      }

      prevIdsRef.current = new Set(currentFetchedIds);
      setAlerts(activeAlerts.reverse());
    } catch (err) {
      console.error('Failed to fetch alerts', err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await resolveAlert(id);
      fetchAlerts();
    } catch (err) {
      console.error('Failed to resolve alert', err);
    }
  };

  return (
    <div className="page-container fade-in">
      <h2>🛡️ Active Alerts Dashboard</h2>
      <p className="subtitle">Live monitor for reported hotel emergencies. Auto-refreshes every 5s.</p>

      <div className="list-container">
        {alerts.length === 0 ? (
          <p className="empty-state">No active emergencies. Everything is secure.</p>
        ) : (
          alerts.map(a => (
            <div key={a.id} className={`alert-card ${a.status === 'Resolved' ? 'resolved' : ''} ${newAlertIds.has(a.id) ? 'highlight-new' : ''}`}>
              <div className="alert-header">
                <div>
                  <span className={`badge ${a.status === 'Resolved' ? 'badge-success' : 'badge-danger'}`}>{a.type}</span>
                  <span className="badge badge-status">{a.status}</span>
                </div>
                <span className="timestamp">{new Date(a.timestamp).toLocaleTimeString()}</span>
              </div>
              <p><strong>📍 Location:</strong> {a.location}</p>
              {a.description && <p className="alert-desc">{a.description}</p>}
              {a.status !== 'Resolved' && (
                <button className="btn-resolve" onClick={() => handleResolve(a.id)}>✅ Mark as Resolved</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
