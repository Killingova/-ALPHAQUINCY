// src/components/checkin/CheckInProcess.jsx
import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import QrScanner from './QrScanner';

export default function CheckInProcess() {
  const { modules } = useSettings();

  // Vereinfachtes Beispiel: Wenn qrCodeScan aktiviert ist, zeigen wir den QrScanner an,
  // andernfalls direkt weiter. In der Realität würden Sie hier logischer vorgehen
  // und je nach Fortschritt und Step die richtige Komponente zurückgeben.
  
  if (modules.qrCodeScan) {
    return <QrScanner />;
  } else {
    // Wenn kein QR-Scan aktiv ist, könnte hier direkt der nächste Schritt kommen,
    // z.B. eGK-Verifizierung, Anamnese etc.
    return <div>Kein QR-Modul aktiv, direkt weiter zum nächsten Schritt...</div>;
  }
}
