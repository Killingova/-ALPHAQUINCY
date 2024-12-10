// src/hooks/useCamera.jsx
import { useCallback, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export function useCamera({ onScan, setError }) {
  const codeReaderRef = useRef(null);
  const videoElementRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = useCallback(async (videoElement) => {
    try {
      // Prüfen, ob bereits ein CodeReader aktiv ist oder kein Video-Element vorhanden
      if (codeReaderRef.current || !videoElement) {
        console.warn('Kamera ist bereits aktiv oder videoElement fehlt.');
        return;
      }

      // Kamera-Stream anfordern
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      // Stream im Video-Element setzen
      videoElement.srcObject = stream;
      // Referenzen speichern, um später beenden zu können
      videoElementRef.current = videoElement;
      streamRef.current = stream;

      // Neuen CodeReader erstellen
      codeReaderRef.current = new BrowserMultiFormatReader();

      // Decodierung starten
      await codeReaderRef.current.decodeFromVideoDevice(
        null,
        videoElement,
        (result, error) => {
          if (result) {
            onScan(result);
          }
          if (error && !(error instanceof NotFoundException)) {
            console.error('Scan-Fehler:', error);
            if (setError) {
              setError(error.message || 'Fehler beim Scannen des QR-Codes.');
            }
          }
        }
      );
    } catch (err) {
      console.error('Fehler beim Starten der Kamera:', err);
      if (setError) {
        setError(err.message || 'Fehler beim Zugriff auf die Kamera.');
      }
    }
  }, [onScan, setError]);

  const stopCamera = useCallback(() => {
    // CodeReader zurücksetzen, wenn vorhanden
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }

    // Stream stoppen, falls vorhanden
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Video-Element aufräumen
    if (videoElementRef.current) {
      videoElementRef.current.srcObject = null;
      videoElementRef.current = null;
    }
  }, []);

  return { startCamera, stopCamera };
}
