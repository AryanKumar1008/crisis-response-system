import { useState } from 'react';
import { createIncident } from '../services/api';

const CRISIS_TYPES = [
  { value: 'medical', label: '🏥 Medical Emergency', color: 'var(--accent-red)' },
  { value: 'fire', label: '🔥 Fire', color: 'var(--accent-orange)' },
  { value: 'security', label: '🔒 Security Threat', color: 'var(--accent-yellow)' },
  { value: 'other', label: '⚠️ Other Emergency', color: 'var(--accent-purple)' },
];

export default function PanicButton({ onIncidentCreated }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [form, setForm] = useState({ guestName: '', roomNumber: '', type: '', description: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePanic = () => {
    setIsExpanded(true);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.guestName || !form.type) return;

    setLoading(true);
    try {
      const incident = await createIncident(form);
      setSuccess(true);
      setForm({ guestName: '', roomNumber: '', type: '', description: '', location: '' });
      if (onIncidentCreated) onIncidentCreated(incident);
      setTimeout(() => {
        setIsExpanded(false);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      alert('Failed to send alert: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="panic-section fade-in">
        <div className="panic-success">
          <div className="panic-success-icon">✅</div>
          <h3>Alert Sent Successfully!</h3>
          <p>Help is on the way. Stay calm and stay where you are.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panic-section">
      {!isExpanded ? (
        <button
          className="panic-button"
          onClick={handlePanic}
          id="panic-trigger-button"
        >
          <span className="panic-button-ripple"></span>
          <span className="panic-button-icon">🚨</span>
          <span className="panic-button-text">EMERGENCY</span>
          <span className="panic-button-sub">Tap to send alert</span>
        </button>
      ) : (
        <form className="panic-form slide-up" onSubmit={handleSubmit}>
          <h3 className="panic-form-title">🚨 Report Emergency</h3>

          <div className="form-group">
            <label htmlFor="panic-guest-name">Your Name *</label>
            <input
              id="panic-guest-name"
              type="text"
              placeholder="Enter your name"
              value={form.guestName}
              onChange={(e) => setForm({ ...form, guestName: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="panic-room">Room Number</label>
              <input
                id="panic-room"
                type="text"
                placeholder="e.g. 301"
                value={form.roomNumber}
                onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="panic-location">Location</label>
              <input
                id="panic-location"
                type="text"
                placeholder="e.g. Lobby, Pool"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Emergency Type *</label>
            <div className="crisis-type-grid">
              {CRISIS_TYPES.map((ct) => (
                <button
                  key={ct.value}
                  type="button"
                  className={`crisis-type-btn ${form.type === ct.value ? 'active' : ''}`}
                  style={{ '--btn-color': ct.color }}
                  onClick={() => setForm({ ...form, type: ct.value })}
                >
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="panic-desc">Description (optional)</label>
            <textarea
              id="panic-desc"
              placeholder="Briefly describe the situation..."
              rows="2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="panic-form-actions">
            <button type="button" className="btn-cancel" onClick={() => setIsExpanded(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-emergency" disabled={loading || !form.guestName || !form.type}>
              {loading ? '⏳ Sending...' : '🚨 Send Alert'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
