import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('crisisRole') || '');
  const [incidents, setIncidents] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('crisisRole', role);
    }
  }, [role]);

  const value = {
    role,
    setRole,
    incidents,
    setIncidents,
    bloodRequests,
    setBloodRequests,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
