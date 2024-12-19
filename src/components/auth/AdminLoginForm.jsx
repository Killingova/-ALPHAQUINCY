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
    <form 
      onSubmit={onSubmit} 
      className="w-full max-w-sm bg-white"
    >
      {error && <p className="text-red-600 mb-4 text-xl">{error}</p>}

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-800 text-lg">Benutzername:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-black"
          placeholder="admin"
        />
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-semibold text-gray-800 text-lg">Passwort:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-black"
          placeholder="••••••"
        />
      </div>

      <div className="flex space-x-4 justify-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-xl px-6 py-2 bg-[#919191] text-white font-semibold rounded hover:opacity-90"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="text-xl px-6 py-2 bg-[#64B400] text-white font-semibold rounded hover:opacity-90"
        >
          Anmelden
        </button>
      </div>
    </form>
  );
}
