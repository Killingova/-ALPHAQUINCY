// src/pages/CheckInPage.jsx
import React, { useEffect, useState } from 'react';
import { useFlow } from '../contexts/FlowContext';
import { useProgressBar } from '../contexts/ProgressBarContext';
import { useNavigate } from 'react-router-dom';
import QrScanner from '../components/checkin/QrScanner';
import PatientForm from '../components/checkin/PatientForm';
import { EyeOff, QrCode } from 'lucide-react';

export default function CheckInPage() {
  const { currentStep, goNextStep, resetFlow } = useFlow();
  const { resetProgress } = useProgressBar();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (currentStep === 'complete') {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'complete' && countdown <= 0) {
      resetFlow();
      resetProgress();
      navigate('/');
    }
  }, [countdown, currentStep, resetFlow, resetProgress, navigate]);

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-white">

      {currentStep === 'qrScan' && (
        <button
          onClick={handleCancel}
          className="absolute top-6 right-6 px-6 py-2 bg-[#919191] text-white font-semibold rounded hover:opacity-90"
        >
          Abbrechen
        </button>
      )}

      {currentStep === 'start' && (
        <div className="text-center">
          <div className="my-6 flex flex-col items-center">
            <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
              <EyeOff size={56} className="text-gray-600" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-center mb-8" style={{ color: '#002D5F' }}>
            Datenschutzhinweis
          </h1>
          <p className="text-xl text-gray-800 leading-relaxed mb-8">
            Bitte beachten Sie die Datenschutzrichtlinien: Stellen Sie sicher, dass sich keine anderen Personen 
            oder sensible Informationen im Fokus der Kamera befinden, bevor Sie den QR-Code scannen.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate('/')}
              className="text-xl px-6 py-2 bg-[#919191] text-white font-semibold rounded hover:opacity-90"
            >
              Abbrechen
            </button>
            <button
              onClick={goNextStep}
              className="text-xl px-6 py-2 bg-[#64B400] text-white font-semibold rounded hover:opacity-90"
            >
              Start
            </button>
          </div>
        </div>
      )}

      {currentStep === 'qrScan' && (
        <div className="max-w-lg w-full text-center mt-10">
          <div className="my-6 flex flex-col items-center">
            <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
              <QrCode size={56} className="text-gray-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#002D5F' }}>
            Bitte scannen Sie Ihren QR-Code
          </h2>
          <QrScanner />
        </div>
      )}

      {currentStep === 'egkRead' && (
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-800">Bitte legen Sie Ihre eGK ein...</p>
          <button
            onClick={goNextStep}
            className="text-xl px-6 py-2 bg-[#0096D2] text-white font-semibold rounded hover:opacity-90"
          >
            Weiter
          </button>
        </div>
      )}

      {(currentStep === 'anamnesis' || currentStep === 'contactInfo') && (
        <div className="max-w-lg w-full">
          <PatientForm />
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="text-center space-y-4">
          <p className="font-semibold text-2xl text-gray-800">Prozess abgeschlossen!</p>
          <p className="text-xl text-gray-700">Bitte nehmen Sie im Wartebereich Platz. Vielen Dank für Ihre Mithilfe.</p>
          <p className="text-sm text-gray-600">
            Die Anwendung kehrt in {countdown} Sekunden zur Startseite zurück.
          </p>
        </div>
      )}
    </div>
  );
}
