import { useState, useEffect } from 'react';
import { getBloodRequests, createBloodRequest } from '../services/api';

export default function BloodRequest() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ bloodType: '', urgency: 'High', location: '' });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getBloodRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBloodRequest(form);
    setForm({ bloodType: '', urgency: 'High', location: '' });
    loadRequests();
  };

  return (
    <div className="page-container fade-in">
      <h2>🩸 Blood Emergency Matcher</h2>
      <p className="subtitle">Find available donors within the hotel for critical emergencies.</p>
      
      <div className="split-view">
        {/* LEFT: Request Form */}
        <div className="view-panel">
          <h3>Create Request</h3>
          <form onSubmit={handleSubmit} className="simple-form">
            <label>Blood Type Required:</label>
            <select required value={form.bloodType} onChange={e => setForm({...form, bloodType: e.target.value})}>
              <option value="">Select Blood Type...</option>
              <option>A+</option><option>O+</option><option>B+</option><option>AB+</option>
              <option>A-</option><option>O-</option><option>B-</option><option>AB-</option>
            </select>

            <label>Urgency Level:</label>
            <select required value={form.urgency} onChange={e => setForm({...form, urgency: e.target.value})}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
            
            <label>Patient Location:</label>
            <input 
              required 
              value={form.location} 
              onChange={e => setForm({...form, location: e.target.value})} 
              placeholder="e.g. Lobby, Room 301"
            />
            
            <button type="submit" className="btn-primary">Submit Alert Broadcast</button>
          </form>
        </div>

        {/* RIGHT: Active Requests */}
        <div className="view-panel">
          <h3>Active Network Requests</h3>
          <div className="list-container">
            {requests.length === 0 ? <p className="empty-state">No active blood requests.</p> : null}
            {requests.map(r => (
               <div key={r.id} className="blood-card" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                 <div style={{display: 'flex', alignItems: 'center', gap: '1rem', width: '100%'}}>
                   <div className="blood-badge">{r.bloodType}</div>
                   <div className="blood-info">
                     <strong>Location: {r.location}</strong>
                     <span className="units">Urgency: {r.urgency}</span>
                     <span className="status">Status: {r.status}</span>
                   </div>
                 </div>
                 
                 {/* Match rendering */}
                 {r.matchedDonors && r.matchedDonors.length > 0 ? (
                   <div style={{marginTop: '1rem', width: '100%', borderTop: '1px solid var(--border)', paddingTop: '1rem'}}>
                     <h4 style={{margin: '0 0 0.5rem 0', color: 'var(--success)'}}>✅ Matched Staff Donors:</h4>
                     <ul style={{margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#555'}}>
                       {r.matchedDonors.map(d => (
                         <li key={d.id} style={{marginBottom: '4px'}}>
                           <strong>{d.name}</strong> ({d.location}) <br/>
                           📞 {d.phone}
                         </li>
                       ))}
                     </ul>
                   </div>
                 ) : (
                   <div style={{marginTop: '1rem', width: '100%', borderTop: '1px solid var(--border)', paddingTop: '1rem', fontSize: '0.9rem', color: 'var(--danger)'}}>
                     ❌ No matching donors available on-site right now.
                   </div>
                 )}
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
