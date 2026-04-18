import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container fade-in">
      <h1>Hospitality Crisis Response System</h1>
      <p>Please select the portal you need to access:</p>
      
      <div className="card-grid">
        <Link to="/panic" className="card card-red">
          <h2>🚨 Guest Panic Button</h2>
          <p>Instantly report an emergency from anywhere on the property.</p>
        </Link>
        <Link to="/staff" className="card card-blue">
          <h2>🛡️ Staff Dashboard</h2>
          <p>Monitor incoming alerts and coordinate emergency response.</p>
        </Link>
        <Link to="/blood" className="card card-green">
          <h2>🩸 Blood Request</h2>
          <p>Access the emergency guest-to-guest blood matching network.</p>
        </Link>
      </div>
    </div>
  );
}
