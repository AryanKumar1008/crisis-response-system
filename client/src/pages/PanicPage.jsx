import { useState } from 'react';
import { createAlert } from '../services/api';

export default function PanicPage() {
  const [form, setForm] = useState({ type: 'Medical', location: '', description: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await createAlert(form);
      setStatus('Alert sent successfully! Help is on the way.');
      setForm({ type: 'Medical', location: '', description: '' });
    } catch (err) {
      setStatus('Failed to send alert. Try again.');
    }
  };

  return (
    <div className="page-container fade-in">
      <h2>🚨 Emergency Panic Button</h2>
      <p className="subtitle">Submit an immediate alert to hotel security and staff.</p>

      <form onSubmit={handleSubmit} className="simple-form">
        <label>Emergency Type:</label>
        <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
          <option>Medical Emergency</option>
          <option>Fire Hazard</option>
          <option>Security Threat</option>
          <option>Other</option>
        </select>

        <label>Your Name & Location/Room:</label>
        <input 
          required 
          value={form.location} 
          onChange={(e) => setForm({...form, location: e.target.value})} 
          placeholder="e.g., John Doe - Lobby, Room 302"
        />

        <label>Description (Optional):</label>
        <textarea 
          rows="3"
          value={form.description} 
          onChange={(e) => setForm({...form, description: e.target.value})}
          placeholder="Brief details about what is happening..."
        />

        <button type="submit" className="btn-panic">TRIGGER EMERGENCY ALERT</button>
        {status && <div className="status-message">{status}</div>}
      </form>
    </div>
  );
}
