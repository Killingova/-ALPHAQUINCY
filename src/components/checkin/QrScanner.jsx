// src/components/checkin/QrScanner.jsx
import React, { useRef, useState, useCallback } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { useNotification } from '../../contexts/NotificationContext';
import { useFlow } from '../../contexts/FlowContext';
import { useProgressBar } from '../../contexts/ProgressBarContext';
import { useNavigate } from 'react-router-dom';

export default function QrScanner() {
  const { addNotification } = useNotification();
  const { goNextStep, resetFlow } = useFlow();
  const { resetProgress } = useProgressBar();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { startCamera, stopCamera } = useCamera({
    onScan: (result) => handleScan(result.text, stopCamera),
    setError,
  });

  const startedRef = useRef(false);

  const videoRefCallback = useCallback((node) => {
    if (node && !startedRef.current) {
      startedRef.current = true;
      startCamera(node);
    } else if (!node && startedRef.current) {
      startedRef.current = false;
      stopCamera();
    }
  }, [startCamera, stopCamera]);

  const appointmentService = {
    confirmAppointment: async (qrCodeData) => {
      const response = await fetch('http://localhost:3001/appointments');
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Termine.');
      }
      const appointments = await response.json();
      const appt = appointments.find(a => a.id === qrCodeData);

      if (!appt) {
        throw new Error('Ungültiger QR-Code oder Termin nicht gefunden.');
      }

      if (!appt.isValid) {
        throw new Error('Termin ist nicht gültig.');
      }

      return { success: true };
    }
  };

  const handleScan = async (qrCodeData, stopCameraFn) => {
    if (scanned) return;
    setScanned(true);

    try {
      await appointmentService.confirmAppointment(qrCodeData);
      stopCameraFn();
      addNotification('QR-Code erfolgreich gescannt!', 'success', 2000);
      goNextStep();
    } catch (err) {
      setError(err.message || 'Fehler beim Scannen des QR-Codes.');
      console.error('QR-Code-Verarbeitung fehlgeschlagen:', err);
    }
  };

  const handleCancel = () => {
    // Kamera stoppen
    stopCamera();
    // Flow und Progress zurücksetzen, damit beim nächsten Start alles neu beginnt
    resetFlow();
    resetProgress();
    // Zur Startseite navigieren
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto">
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4 text-xl">
          {error}
        </div>
      )}
      <video
        ref={videoRefCallback}
        className="w-full h-auto border border-gray-300 rounded-md shadow-md"
        autoPlay
        playsInline
        muted
      />
      <p className="text-center mt-2 text-gray-500 text-xl">
        Bitte positionieren Sie den QR-Code vor der Kamera
      </p>

      {/* Abbrechen-Button unterhalb des Videos */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleCancel}
          className="text-xl px-6 py-2 bg-[#919191] text-white font-semibold rounded hover:opacity-90"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
