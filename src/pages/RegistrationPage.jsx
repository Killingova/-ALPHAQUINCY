// src/pages/RegistrationPage.jsx
import React from 'react';
import { useDevice } from '../contexts/DeviceContext';
import DeviceRegistrationForm from '../components/device/DeviceRegistrationForm';
import { Key } from 'lucide-react'; // Symbolisiert die Registrierung

export default function RegistrationPage() {
  const { isRegistered, loading, error } = useDevice();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Lade...
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-bold mb-6" style={{ color: '#002D5F' }}>Gerät ist bereits registriert.</h2>
        <a href="/" className="text-blue-600 underline text-2xl">Zur Startseite</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      {/* Icon und Überschrift im selben Stil wie HomePage */}
      <div className="my-6">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
          <Key size={56} className="text-gray-600" />
        </div>
      </div>

      <h1 className="text-6xl font-bold text-center mb-8" style={{ color: '#002D5F' }}>
        Geräte-Registrierung
      </h1>

      {error && <p className="text-red-600 mb-4 text-xl">{error}</p>}
      <DeviceRegistrationForm />
    </div>
  );
}
