// src/pages/CheckInPage.jsx
import React, { useEffect, useState } from 'react';
import { useFlow } from '../contexts/FlowContext';
import { useProgressBar } from '../contexts/ProgressBarContext';
import { useNavigate } from 'react-router-dom';
import QrScanner from '../components/checkin/QrScanner';
import PatientForm from '../components/checkin/PatientForm';

export default function CheckInPage() {
  const { currentStep, goNextStep, resetFlow } = useFlow();
  const { resetProgress } = useProgressBar();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10); // 10 Sekunden Countdown

  console.log('CheckInPage render, currentStep:', currentStep);

  useEffect(() => {
    let timer;
    if (currentStep === 'complete') {
      // Jede Sekunde Countdown reduzieren
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentStep]);

  useEffect(() => {
    // Wenn Countdown abgelaufen ist, Flow und Progress zurücksetzen und zur Startseite navigieren
    if (currentStep === 'complete' && countdown <= 0) {
      // Zuerst Flow und Progress zurücksetzen
      resetFlow();
      resetProgress();
      // Danach zur Startseite navigieren
      navigate('/');
    }
  }, [countdown, currentStep, resetFlow, resetProgress, navigate]);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Check-In Prozess</h1>

      {currentStep === 'start' && (
        <div className="text-center space-y-4">
          <p>
            Bitte beachten Sie die Datenschutzrichtlinien: Stellen Sie sicher, dass sich keine anderen Personen 
            oder sensible Informationen im Fokus der Kamera befinden, bevor Sie den QR-Code scannen.
          </p>
          <button onClick={goNextStep} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Kamera starten
          </button>
        </div>
      )}

      {currentStep === 'qrScan' && <QrScanner />}

      {currentStep === 'egkRead' && (
        <div className="text-center space-y-4">
          <p>Bitte legen Sie Ihre eGK ein...</p>
          <button onClick={goNextStep} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Weiter
          </button>
        </div>
      )}

      {(currentStep === 'anamnesis' || currentStep === 'contactInfo') && <PatientForm />}

      {currentStep === 'complete' && (
        <div className="text-center space-y-4">
          <p className="font-semibold text-lg">Prozess abgeschlossen!</p>
          <p>Bitte nehmen Sie im Wartebereich Platz. Vielen Dank für Ihre Mithilfe.</p>
          <p className="text-sm text-gray-600">
            Die Anwendung kehrt in {countdown} Sekunden zur Startseite zurück.
          </p>
        </div>
      )}
    </div>
  );
}
