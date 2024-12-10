import React, { useState } from 'react';
import { useDevice } from '../../contexts/DeviceContext';

export default function DeviceRegistrationForm() {
  const { handleRegisterDevice, error } = useDevice();
  const [ip, setIp] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (!ip || !adminUser || !adminPass) {
      setFormError('Bitte füllen Sie alle Felder aus.');
      return;
    }

    const success = await handleRegisterDevice(ip, adminUser, adminPass);
    if (!success) {
      // Fehler wird über "error" aus dem DeviceContext ausgegeben
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:'300px', margin:'0 auto', padding:'1rem', background:'#f1f1f1', borderRadius:'5px'}}>
      {formError && <p style={{color:'red', marginBottom:'1rem'}}>{formError}</p>}
      {error && <p style={{color:'red', marginBottom:'1rem'}}>{error}</p>}
      <div style={{marginBottom:'1rem'}}>
        <label style={{display:'block', fontWeight:'bold', marginBottom:'0.5rem'}} htmlFor="ip">Praxis IP-Adresse:</label>
        <input
          id="ip"
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          style={{width:'100%', padding:'0.5rem', border:'1px solid #ccc'}}
          placeholder="z.B. 192.168.0.10"
        />
      </div>
      <div style={{marginBottom:'1rem'}}>
        <label style={{display:'block', fontWeight:'bold', marginBottom:'0.5rem'}} htmlFor="adminUser">Admin-Benutzername:</label>
        <input
          id="adminUser"
          type="text"
          value={adminUser}
          onChange={(e) => setAdminUser(e.target.value)}
          style={{width:'100%', padding:'0.5rem', border:'1px solid #ccc'}}
          placeholder="admin"
        />
      </div>
      <div style={{marginBottom:'1rem'}}>
        <label style={{display:'block', fontWeight:'bold', marginBottom:'0.5rem'}} htmlFor="adminPass">Admin-Passwort:</label>
        <input
          id="adminPass"
          type="password"
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          style={{width:'100%', padding:'0.5rem', border:'1px solid #ccc'}}
          placeholder="password123"
        />
      </div>
      <button type="submit" style={{background:'#1d4ed8', color:'white', padding:'0.5rem 1rem', borderRadius:'5px', border:'none'}}>
        Jetzt registrieren
      </button>
    </form>
  );
}
