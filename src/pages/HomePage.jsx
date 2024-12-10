// src/pages/HomePage.jsx
import React from 'react';
import { useDevice } from '../contexts/DeviceContext';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { isRegistered } = useDevice();
  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Willkommen
      </h1>
      {!isRegistered ? (
        <div className="text-center">
          <p className="mb-4">Das Gerät ist noch nicht registriert.</p>
          <Link
            to="/register-device"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
          >
            Jetzt registrieren
          </Link>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-700">
            Das Gerät ist registriert! Sie können direkt mit dem Check-In starten.
          </p>
          <button
            onClick={() => navigate('/check-in')}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform active:scale-95"
          >
            Check-In starten
          </button>
        </div>
      )}
    </div>
  );
}
