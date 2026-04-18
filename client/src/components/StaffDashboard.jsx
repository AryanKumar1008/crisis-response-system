import { useState, useEffect } from 'react';
import { getIncidents, updateIncidentStatus, getBloodRequests } from '../services/api';
import IncidentCard from '../components/IncidentCard';
import BloodDonorMatch from '../components/BloodDonorMatch';

export default function StaffDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [inc, blood] = await Promise.all([getIncidents(), getBloodRequests()]);
      setIncidents(inc);
      setBloodRequests(blood);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateIncidentStatus(id, status);
      fetchData();
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const filtered = filter === 'all' ? incidents : incidents.filter(i => i.status === filter);
  const activeCount = incidents.filter(i => i.status === 'active').length;
  const respondingCount = incidents.filter(i => i.status === 'responding').length;
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length;

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="staff-dashboard slide-up">
      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card stat-active">
          <span className="stat-number">{activeCount}</span>
          <span className="stat-label">🔴 Active</span>
        </div>
        <div className="stat-card stat-responding">
          <span className="stat-number">{respondingCount}</span>
          <span className="stat-label">🟠 Responding</span>
        </div>
        <div className="stat-card stat-resolved">
          <span className="stat-number">{resolvedCount}</span>
          <span className="stat-label">🟢 Resolved</span>
        </div>
        <div className="stat-card stat-blood">
          <span className="stat-number">{bloodRequests.length}</span>
          <span className="stat-label">🩸 Blood Requests</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Incidents Panel */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>📋 Incidents</h2>
            <div className="filter-tabs">
              {['all', 'active', 'responding', 'resolved'].map((f) => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="incident-list">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>No {filter === 'all' ? '' : filter} incidents</p>
              </div>
            ) : (
              filtered.map((inc) => (
                <IncidentCard
                  key={inc.id}
                  incident={inc}
                  showControls={true}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </div>

        {/* Blood Panel */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>🩸 Blood Requests</h2>
          </div>

          <div className="blood-request-list">
            {bloodRequests.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">💉</span>
                <p>No blood requests yet</p>
              </div>
            ) : (
              bloodRequests.map((req) => (
                <div key={req.id} className="blood-request-card" onClick={() => setSelectedRequest(req.id === selectedRequest ? null : req.id)}>
                  <div className="blood-request-header">
                    <span className="blood-type-badge">{req.bloodType}</span>
                    <span className={`urgency-badge urgency-${req.urgency}`}>{req.urgency}</span>
                  </div>
                  <div className="blood-request-body">
                    <span>👤 {req.patientName}</span>
                    <span>📍 {req.location}</span>
                    <span>📦 {req.units} unit(s)</span>
                  </div>
                  {selectedRequest === req.id && (
                    <BloodDonorMatch requestId={req.id} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <button className="btn-refresh-all" onClick={fetchData}>
        🔄 Refresh All Data
      </button>
    </div>
  );
}
