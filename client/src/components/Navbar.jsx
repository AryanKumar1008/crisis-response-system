import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ role, setRole }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    const newRole = role === 'Guest' ? 'Staff' : 'Guest';
    setRole(newRole);
    if (newRole === 'Staff') navigate('/staff');
    else navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">⚠️ Crisis Response System</Link>
      
      <div className="nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {role === 'Guest' ? (
          <>
            <Link to="/panic" className={location.pathname === '/panic' ? 'active' : ''}>Panic Button</Link>
            <Link to="/blood" className={location.pathname === '/blood' ? 'active' : ''}>Blood Network</Link>
          </>
        ) : (
          <>
            <Link to="/staff" className={location.pathname === '/staff' ? 'active' : ''}>Staff Dashboard</Link>
            <Link to="/blood" className={location.pathname === '/blood' ? 'active' : ''}>Blood Network</Link>
          </>
        )}
      </div>

      <div className="role-toggle">
        <span className={role === 'Guest' ? 'active-role' : 'inactive-role'}>Guest</span>
        <label className="switch">
          <input type="checkbox" checked={role === 'Staff'} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
        <span className={role === 'Staff' ? 'active-role' : 'inactive-role'}>Staff</span>
      </div>
    </nav>
  );
}
