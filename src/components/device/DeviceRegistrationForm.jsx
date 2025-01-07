// src/components/device/DeviceRegistrationForm.jsx
import React, { useState } from 'react';
import { useDevice } from '../../contexts/DeviceContext';
import { useNavigate } from 'react-router-dom';

export default function DeviceRegistrationForm() {
  const { handleRegisterDevice, error } = useDevice();
  const navigate = useNavigate();
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
    if (success) {
      // Bereits im DeviceContext: navigate('/admin-login') o. ä.
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-sm bg-white"
    >
      {formError && <p className="text-red-600 mb-4 text-xl">{formError}</p>}
      {error && <p className="text-red-600 mb-4 text-xl">{error}</p>}

      <div className="mb-6">
        <label htmlFor="ip" className="block mb-2 font-semibold text-gray-800 text-lg">Praxis IP-Adresse:</label>
        <input
          id="ip"
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="w-full p-2 border border-black"
          placeholder="z.B. 192.168.0.10"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="adminUser" className="block mb-2 font-semibold text-gray-800 text-lg">Admin-Benutzername:</label>
        <input
          id="adminUser"
          type="text"
          value={adminUser}
          onChange={(e) => setAdminUser(e.target.value)}
          className="w-full p-2 border border-black"
          placeholder="admin"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="adminPass" className="block mb-2 font-semibold text-gray-800 text-lg">Admin-Passwort:</label>
        <input
          id="adminPass"
          type="password"
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          className="w-full p-2 border border-black"
          placeholder="password123"
        />
      </div>

      <div className="flex space-x-4 justify-center">

        <button
          type="submit"
          className="text-2xl inline-block px-6 py-2 rounded font-semibold transition"
            style={{ backgroundColor: '#0096D2', color: '#FFFFFF' }}
        >
          Registrieren
        </button>
      </div>
    </form>
  );
}
