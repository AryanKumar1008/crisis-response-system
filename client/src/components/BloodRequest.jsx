import { useState } from 'react';
import { createBloodRequest, registerDonor } from '../services/api';

const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const URGENCY_LEVELS = [
  { value: 'normal', label: 'Normal', color: 'var(--accent-blue)' },
  { value: 'urgent', label: 'Urgent', color: 'var(--accent-orange)' },
  { value: 'critical', label: 'Critical', color: 'var(--accent-red)' },
];

export default function BloodRequest({ onRequestCreated }) {
  const [tab, setTab] = useState('request'); // 'request' | 'donor'
  const [requestForm, setRequestForm] = useState({ patientName: '', bloodType: '', location: '', urgency: 'normal', units: 1 });
  const [donorForm, setDonorForm] = useState({ name: '', bloodType: '', location: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBloodRequest(requestForm);
      setMessage({ type: 'success', text: '✅ Blood request submitted!' });
      setRequestForm({ patientName: '', bloodType: '', location: '', urgency: 'normal', units: 1 });
      if (onRequestCreated) onRequestCreated();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: '❌ ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDonor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerDonor(donorForm);
      setMessage({ type: 'success', text: '✅ Registered as donor!' });
      setDonorForm({ name: '', bloodType: '', location: '', phone: '' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: '❌ ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blood-section">
      <div className="blood-tabs">
        <button
          className={`blood-tab ${tab === 'request' ? 'active' : ''}`}
          onClick={() => setTab('request')}
        >
          🩸 Request Blood
        </button>
        <button
          className={`blood-tab ${tab === 'donor' ? 'active' : ''}`}
          onClick={() => setTab('donor')}
        >
          💉 Register as Donor
        </button>
      </div>

      {message && (
        <div className={`blood-message blood-message--${message.type} fade-in`}>
          {message.text}
        </div>
      )}

      {tab === 'request' ? (
        <form className="blood-form slide-up" onSubmit={handleRequest}>
          <div className="form-group">
            <label htmlFor="blood-patient-name">Patient Name *</label>
            <input
              id="blood-patient-name"
              type="text"
              placeholder="Enter patient name"
              value={requestForm.patientName}
              onChange={(e) => setRequestForm({ ...requestForm, patientName: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="blood-type-select">Blood Type *</label>
              <select
                id="blood-type-select"
                value={requestForm.bloodType}
                onChange={(e) => setRequestForm({ ...requestForm, bloodType: e.target.value })}
                required
              >
                <option value="">Select type</option>
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="blood-units">Units</label>
              <input
                id="blood-units"
                type="number"
                min="1"
                max="10"
                value={requestForm.units}
                onChange={(e) => setRequestForm({ ...requestForm, units: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="blood-location">Location</label>
            <input
              id="blood-location"
              type="text"
              placeholder="e.g. Floor 2, Room 205"
              value={requestForm.location}
              onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Urgency Level</label>
            <div className="urgency-grid">
              {URGENCY_LEVELS.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  className={`urgency-btn ${requestForm.urgency === u.value ? 'active' : ''}`}
                  style={{ '--btn-color': u.color }}
                  onClick={() => setRequestForm({ ...requestForm, urgency: u.value })}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-blood-submit" disabled={loading}>
            {loading ? '⏳ Submitting...' : '🩸 Submit Blood Request'}
          </button>
        </form>
      ) : (
        <form className="blood-form slide-up" onSubmit={handleDonor}>
          <div className="form-group">
            <label htmlFor="donor-name">Your Name *</label>
            <input
              id="donor-name"
              type="text"
              placeholder="Enter your name"
              value={donorForm.name}
              onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="donor-blood-type">Your Blood Type *</label>
              <select
                id="donor-blood-type"
                value={donorForm.bloodType}
                onChange={(e) => setDonorForm({ ...donorForm, bloodType: e.target.value })}
                required
              >
                <option value="">Select type</option>
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="donor-phone">Phone</label>
              <input
                id="donor-phone"
                type="tel"
                placeholder="+91-XXXXXXXXXX"
                value={donorForm.phone}
                onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="donor-location">Location</label>
            <input
              id="donor-location"
              type="text"
              placeholder="e.g. Floor 1, Lobby"
              value={donorForm.location}
              onChange={(e) => setDonorForm({ ...donorForm, location: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-donor-submit" disabled={loading}>
            {loading ? '⏳ Registering...' : '💉 Register as Donor'}
          </button>
        </form>
      )}
    </div>
  );
}
