import { useState, useEffect } from 'react';
import { matchDonors } from '../services/api';

export default function BloodDonorMatch({ requestId, bloodRequest }) {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await matchDonors(requestId);
      setMatchData(data);
    } catch (err) {
      console.error('Match failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestId) fetchMatches();
  }, [requestId]);

  if (loading) {
    return (
      <div className="match-loading">
        <div className="spinner"></div>
        <span>Searching for donors...</span>
      </div>
    );
  }

  if (!matchData) return null;

  return (
    <div className="match-results fade-in">
      <div className="match-header">
        <h4>🩸 Donor Matches for {matchData.request.patientName}</h4>
        <span className="match-count">
          {matchData.totalMatches} donor{matchData.totalMatches !== 1 ? 's' : ''} found
        </span>
      </div>

      <div className="match-info">
        <span>Requested: <strong>{matchData.request.bloodType}</strong></span>
        <span>Compatible types: <strong>{matchData.compatibleTypes.join(', ')}</strong></span>
      </div>

      {matchData.matchedDonors.length === 0 ? (
        <div className="match-empty">
          <span>😔</span>
          <p>No matching donors available right now</p>
        </div>
      ) : (
        <div className="match-donor-list">
          {matchData.matchedDonors.map((donor, idx) => (
            <div key={donor.id} className="match-donor-card" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="donor-rank">#{idx + 1}</div>
              <div className="donor-info">
                <span className="donor-name">{donor.name}</span>
                <div className="donor-details">
                  <span className="donor-blood-type">{donor.bloodType}</span>
                  <span>📍 {donor.location}</span>
                  <span>📞 {donor.phone}</span>
                </div>
              </div>
              {donor.bloodType === matchData.request.bloodType && (
                <span className="exact-match-badge">Exact Match</span>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="btn-refresh-match" onClick={fetchMatches}>
        🔄 Refresh Matches
      </button>
    </div>
  );
}
