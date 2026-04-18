import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function RoleSelector() {
  const { setRole } = useApp();
  const navigate = useNavigate();

  const selectRole = (role) => {
    setRole(role);
    navigate(role === 'staff' ? '/staff' : '/guest');
  };

  return (
    <div className="role-selector-page">
      <div className="role-hero">
        <div className="role-hero-icon">🚨</div>
        <h1 className="role-hero-title">Crisis Response System</h1>
        <p className="role-hero-subtitle">
          Hospitality Emergency Management & Blood Matching Platform
        </p>
      </div>

      <div className="role-cards">
        <button
          className="role-card role-card-guest"
          onClick={() => selectRole('guest')}
          id="select-guest-role"
        >
          <div className="role-card-icon">👤</div>
          <h2>Guest</h2>
          <p>Trigger panic alerts, request blood, register as a donor</p>
          <div className="role-card-arrow">→</div>
        </button>

        <button
          className="role-card role-card-staff"
          onClick={() => selectRole('staff')}
          id="select-staff-role"
        >
          <div className="role-card-icon">🛡️</div>
          <h2>Staff</h2>
          <p>Monitor incidents, manage responses, coordinate blood matching</p>
          <div className="role-card-arrow">→</div>
        </button>
      </div>

      <div className="role-footer">
        <span className="role-footer-dot"></span>
        <span>System Online — Real-time Monitoring Active</span>
      </div>
    </div>
  );
}
