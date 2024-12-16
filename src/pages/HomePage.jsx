// src/pages/HomePage.jsx
import React from 'react';
import { useDevice } from '../contexts/DeviceContext';
import { useNotification } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

export default function HomePage() {
  const { isRegistered } = useDevice();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  // Funktion zum Anzeigen der Notification
  const showAdminNotification = () => {
    addNotification(
      'Um dieses Gerät für den digitalen Check-in nutzen zu können, muss es zunächst von einem autorisierten Administrator registriert werden.',
      'info',
      4000
    );
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Icon Bereich */}
      <div className="my-6">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
          <LockKeyhole size={56} className="text-gray-600" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: '#002D5F' }}>
        Quincy Check-In
      </h1>
      
      {!isRegistered ? (
        <div className="text-center">
          <p className="text-center text-gray-700 mb-8">
            Zertifiziert nach § 5 Abs. und § Abs. SGB V <br />
            Zertifikatsnummer: Y/308/1407/27/244
          </p>
          <p className="text-2xl mb-4">
            Bitte klicken Sie auf <span 
              className="font-semibold cursor-pointer" 
              style={{ color: '#002D5F' }}
              onClick={() => navigate('/register-device')}
            >
              Registrieren
            </span>, um die notwendigen Daten einzugeben. <br />
            Wenn Sie nicht berechtigt sind, wenden Sie sich bitte an einen{' '}
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
              className="inline-block px-4 py-2 rounded font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: '#919191', color: '#FFFFFF' }}
            >
              Abbrechen
            </button>
            <button
              onClick={() => navigate('/register-device')}
              className="inline-block px-4 py-2 rounded font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: '#64B400', color: '#FFFFFF' }}
            >
              Registrieren
            </button>
          </div>
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
