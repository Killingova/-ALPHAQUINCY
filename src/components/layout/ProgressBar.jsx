// src/components/layout/ProgressBar.jsx
import React from 'react';
import { useProgressBar } from '../../contexts/ProgressBarContext';
import {
  PlayCircle,
  QrCode,
  CreditCard,
  ClipboardList,
  UserCheck,
  CheckCircle,
  FileText // Neues Icon für Formulare
} from 'lucide-react';

const iconMap = {
  Start: PlayCircle,
  'QR-Code': QrCode,
  eGK: CreditCard,
  Anamnese: ClipboardList,
  Kontaktinfo: UserCheck,
  Fertig: CheckCircle,
  Formulare: FileText // Neuer Eintrag für "Formulare"
};

export default function ProgressBar() {
  const { progress, steps } = useProgressBar();
  const totalSteps = steps.length;

  return (
    <div 
      className="p-4 bg-white flex flex-col items-center w-full relative"
      style={{ height: '100px' }}
    >
      <div className="relative w-full h-full">
        {/* Hintergrundbalken auf mittlerer Höhe */}
        <div
          className="absolute left-0 right-0 bg-gray-200 rounded-full"
          style={{ 
            top: '50%',
            height: '8px',
            transform: 'translateY(-50%)',
            zIndex: 1 
          }}
        ></div>

        {/* Blauer Fortschrittsbalken */}
        <div
          className="absolute bg-blue-500 transition-all duration-500 rounded-full"
          style={{
            top: '50%',
            left: 0,
            height: '8px',
            width: `${progress}%`,
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        ></div>

        {/* Steps mit Icons und Namen */}
        {steps.map((step, index) => {
          const IconComponent = iconMap[step.name] || PlayCircle;
          const isActive = progress >= step.percentage;
          const leftPosition = (index / (totalSteps - 1)) * 100;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
              style={{
                position: 'absolute',
                top: '50%',
                left: `${leftPosition}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2 
              }}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-100 text-gray-400 border-gray-300'
                }`}
              >
                <IconComponent size={20} />
              </div>
              <span
                className={`text-xs mt-2 ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
