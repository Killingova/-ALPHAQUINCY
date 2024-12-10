// src/contexts/DeviceContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { login } from '../api/authApi'; 
import { useNavigate } from 'react-router-dom';

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('deviceData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed && parsed.registriert) {
        setDeviceData(parsed);
        setIsRegistered(true);
      }
    }
    setLoading(false);
  }, []);

  async function handleRegisterDevice(ip, adminUser, adminPass) {
    setError(null);
    const admin = await login(adminUser, adminPass);
    if (!admin) {
      setError('Admin-Benutzername oder Passwort ist ungültig.');
      addNotification('Admin-Benutzername oder Passwort ist ungültig.', 'error', 4000);
      return false;
    }

    const newData = { ip, adminUser, registriert: true };
    setDeviceData(newData);
    setIsRegistered(true);
    localStorage.setItem('deviceData', JSON.stringify(newData));
    addNotification('Gerät erfolgreich registriert!', 'success', 3000);

    // Nach erfolgreicher Registrierung direkt zur Admin-Login-Seite
    navigate('/admin-login');

    return true;
  }

  return (
    <DeviceContext.Provider value={{ isRegistered, deviceData, loading, error, handleRegisterDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  return useContext(DeviceContext);
}
