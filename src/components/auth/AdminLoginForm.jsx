// src/components/auth/AdminLoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';

export default function AdminLoginForm() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { addNotification } = useNotification();

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!username) {
      setError('Bitte geben Sie einen Benutzernamen ein.');
      return;
    }
    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen haben.');
      return;
    }

    const success = await handleLogin(username, password);
    if (!success) {
      setError('Benutzername oder Passwort ist falsch.');
      addNotification('Benutzername oder Passwort ist falsch.', 'error', 4000);
    } else {
      addNotification('Erfolgreich eingeloggt!', 'success', 3000);
      navigate('/admin');
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: '300px', margin: '0 auto', padding:'1rem', background:'#f1f1f1', borderRadius:'5px' }}>
      <h2 style={{fontWeight:'bold', marginBottom:'1rem'}}>Admin Login</h2>
      {error && <p style={{color:'red', marginBottom:'1rem'}}>{error}</p>}
      <div style={{marginBottom:'1rem'}}>
        <label style={{display:'block', fontWeight:'bold', marginBottom:'0.5rem'}}>Benutzername:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{width:'100%', padding:'0.5rem', border:'1px solid #ccc'}}
        />
      </div>
      <div style={{marginBottom:'1rem'}}>
        <label style={{display:'block', fontWeight:'bold', marginBottom:'0.5rem'}}>Passwort:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{width:'100%', padding:'0.5rem', border:'1px solid #ccc'}}
        />
      </div>
      <button type="submit" style={{background:'#1d4ed8', color:'white', padding:'0.5rem 1rem', borderRadius:'5px', border:'none'}}>
        Anmelden
      </button>
    </form>
  );
}
