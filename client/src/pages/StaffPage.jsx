import StaffDashboard from '../components/StaffDashboard';

export default function StaffPage() {
  return (
    <div className="staff-page">
      <div className="page-header">
        <h1>🛡️ Staff Crisis Dashboard</h1>
        <p>Real-time incident monitoring and blood request management</p>
      </div>
      <StaffDashboard />
    </div>
  );
}
