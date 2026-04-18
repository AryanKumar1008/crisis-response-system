import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PanicPage from './pages/PanicPage';
import StaffDashboard from './pages/StaffDashboard';
import BloodRequest from './pages/BloodRequest';
import './index.css';

export default function App() {
  const [role, setRole] = useState('Guest');

  return (
    <>
      <Navbar role={role} setRole={setRole} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/panic" element={<PanicPage />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/blood" element={<BloodRequest />} />
        </Routes>
      </main>
    </>
  );
}
