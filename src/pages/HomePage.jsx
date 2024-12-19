// src/pages/HomePage.jsx
import React from 'react';
import { useDevice } from '../contexts/DeviceContext';
import { useNotification } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, House, LogIn } from 'lucide-react';

export default function HomePage() {
  const { isRegistered } = useDevice();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const showAdminNotification = () => {
    addNotification(
      'Um dieses Gerät für den digitalen Check-in nutzen zu können, muss es zunächst von einem autorisierten Administrator registriert werden.',
      'info',
      4000
    );
  };

  if (!isRegistered) {
    // Gerät noch nicht registriert
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="my-6">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
            <LockKeyhole size={56} className="text-gray-600" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-center mb-6" style={{ color: '#002D5F' }}>
          Quincy Check-In
        </h1>

        <div className="text-center">
          <p className="text-gray-700 mb-8 text-xl leading-relaxed">
            Zertifiziert nach § Abs. und § Abs. SGB V <br />
            Zertifikatsnummer: Y/308/1407/27/244
          </p>
          <p className="text-2xl mb-4 leading-relaxed">
            Bitte klicken Sie auf{' '}
            <span
              className="font-semibold cursor-pointer"
              style={{ color: '#002D5F' }}
              onClick={() => navigate('/register-device')}
            >
              Registrieren
            </span>, um die notwendigen Daten einzugeben. Wenn Sie nicht berechtigt sind, wenden Sie sich bitte an einen{' '}
            <span
              className="font-semibold cursor-pointer"
              style={{ color: '#002D5F' }}
              onClick={showAdminNotification}
            >
              Administrator
            </span>.
          </p>
          <div className="flex justify-center space-x-6 mt-8 p-4">
            <button
              onClick={showAdminNotification}
              className="text-xl inline-block px-8 py-4 rounded font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: '#919191', color: '#FFFFFF' }}
            >
              Abbrechen
            </button>
            <button
              onClick={() => navigate('/register-device')}
              className="text-xl inline-block px-8 py-4 rounded font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: '#64B400', color: '#FFFFFF' }}
            >
              Registrieren
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // Gerät bereits registriert
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="my-6">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
            <House size={56} className="text-gray-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-6" style={{ color: '#002D5F' }}>
          Willkommen in unserer Praxis!
        </h1>

        <div className="flex items-center justify-center mb-6">
          {/* Größe des Icons leicht reduziert (z. B. von 456 auf 300) für bessere Balance */}
          <LogIn size={300} className="text-gray-100" />
        </div>

        <div className="text-center text-2xl text-gray-700 mb-8">
          Bitte starten Sie Ihre Anmeldung, um fortzufahren.
        </div>

        <div className="flex justify-center space-x-6 p-4">
          <button
            onClick={showAdminNotification}
            className="text-2xl inline-block px-4 py-2 rounded font-semibold transition"
            style={{ backgroundColor: '#919191', color: '#FFFFFF' }}
          >
            Abbrechen
          </button>
          <button
            onClick={() => navigate('/check-in')}
            className="text-2xl inline-block px-4 py-2 rounded font-semibold transition"
            style={{ backgroundColor: '#0096D2', color: '#FFFFFF' }}
          >
            Anmeldung
          </button>
        </div>
      </div>
    );
  }
}
