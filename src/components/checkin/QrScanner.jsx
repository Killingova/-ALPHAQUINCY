// src/components/checkin/QrScanner.jsx
import React, { useRef, useState, useCallback } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { useNotification } from '../../contexts/NotificationContext';
import { useFlow } from '../../contexts/FlowContext';

export default function QrScanner() {
  const { addNotification } = useNotification();
  const { goNextStep } = useFlow();
  const [error, setError] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { startCamera, stopCamera } = useCamera({
    onScan: (result) => handleScan(result.text, stopCamera),
    setError,
  });

  // Startet die Kamera erst, wenn das Video-Element gemountet ist
  // und stoppt sie, wenn das Video-Element unmounted wird.
  const startedRef = useRef(false);

  const videoRefCallback = useCallback((node) => {
    if (node && !startedRef.current) {
      // Video-Element ist gemountet, Kamera starten
      startedRef.current = true;
      startCamera(node);
    } else if (!node && startedRef.current) {
      // Video-Element ist unmounted, Kamera stoppen
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
    if (scanned) return; // Verhindert mehrfaches Ausführen
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

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Bitte scannen Sie Ihren QR-Code</h2>
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          {error}
        </div>
      )}
      {/* Der ref-Callback wird aufgerufen, sobald das Video in den DOM kommt bzw. entfernt wird */}
      <video
        ref={videoRefCallback}
        className="w-full h-auto border border-gray-300 rounded-md shadow-md"
        autoPlay
        playsInline
        muted
      />
      <p className="text-center mt-2 text-gray-500">
        Bitte positionieren Sie den QR-Code vor der Kamera
      </p>
    </div>
  );
}
