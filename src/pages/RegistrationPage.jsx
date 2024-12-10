import React from 'react';
import { useDevice } from '../contexts/DeviceContext';
import DeviceRegistrationForm from '../components/device/DeviceRegistrationForm';

export default function RegistrationPage() {
  const { isRegistered, loading, error } = useDevice();

  if (loading) {
    return <div>Lade...</div>;
  }

  if (isRegistered) {
    return <div>Gerät ist bereits registriert. <a href="/">Zur Startseite</a></div>;
  }

  return (
    <div style={{padding:'1rem'}}>
      <h1 style={{fontWeight:'bold', fontSize:'1.25rem', marginBottom:'1rem'}}>Geräte-Registrierung</h1>
      {error && <p style={{color:'red'}}>{error}</p>}
      <DeviceRegistrationForm />
    </div>
  );
}
