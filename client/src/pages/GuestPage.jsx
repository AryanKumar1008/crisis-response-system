import { useState, useEffect } from 'react';
import PanicButton from '../components/PanicButton';
import BloodRequest from '../components/BloodRequest';
import IncidentCard from '../components/IncidentCard';
import { getIncidents } from '../services/api';

export default function GuestPage() {
  const [incidents, setIncidents] = useState([]);
  const [view, setView] = useState('panic'); // 'panic' | 'blood' | 'status'

  const fetchIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="guest-page">
      <div className="guest-tabs">
        <button
          className={`guest-tab ${view === 'panic' ? 'active' : ''}`}
          onClick={() => setView('panic')}
        >
          🚨 Emergency
        </button>
        <button
          className={`guest-tab ${view === 'blood' ? 'active' : ''}`}
          onClick={() => setView('blood')}
        >
          🩸 Blood
        </button>
        <button
          className={`guest-tab ${view === 'status' ? 'active' : ''}`}
          onClick={() => setView('status')}
        >
          📋 Status {incidents.filter(i => i.status !== 'resolved').length > 0 && (
            <span className="tab-badge">{incidents.filter(i => i.status !== 'resolved').length}</span>
          )}
        </button>
      </div>

      <div className="guest-content">
        {view === 'panic' && (
          <div className="fade-in">
            <PanicButton onIncidentCreated={fetchIncidents} />
          </div>
        )}

        {view === 'blood' && (
          <div className="fade-in">
            <BloodRequest onRequestCreated={fetchIncidents} />
          </div>
        )}

        {view === 'status' && (
          <div className="fade-in">
            <h2 className="section-title">📋 Active Incidents</h2>
            {incidents.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">✅</span>
                <p>No active incidents. All clear!</p>
              </div>
            ) : (
              <div className="incident-list">
                {incidents.map((inc) => (
                  <IncidentCard key={inc.id} incident={inc} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
