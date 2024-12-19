// src/components/layout/ProgressBar.jsx
import React from 'react';
import { useProgressBar } from '../../contexts/ProgressBarContext';
import { UserPlus, QrCode, IdCard, ClipboardList, UserCheck, BookUser } from 'lucide-react';

const iconMap = {
  'Anmeldung': UserPlus,
  'QR-Code Scan': QrCode,
  'eGK Lesen': IdCard,
  'Anamnese': ClipboardList,
  'Kontakt': BookUser,
  'Bestätigung': UserCheck
};

export default function ProgressBar() {
  const { progress, steps } = useProgressBar();

  return (
    <div className="w-full flex flex-col items-center bg-[#002D5F]">
      {/* Zeile für Icons und Namen gemeinsam */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-2">
        {steps.map((step) => {
          const IconComponent = iconMap[step.name];
          const isActive = progress >= step.percentage;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              {IconComponent ? (
                <IconComponent
                  size={56}
                  className={isActive ? "text-white" : "text-white opacity-50"}
                />
              ) : (
                <div style={{ color: 'red' }}>Icon not found: {step.name}</div>
              )}
              <span
                className={
                  isActive
                    ? "text-2xl text-white font-semibold mt-2"
                    : "text-2xl text-white opacity-70 mt-2"
                }
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Fortschrittsbalken unter den Namen */}
      <div className="relative w-full max-w-4xl m-6" style={{ height: '28px' }}>
        <div className="absolute w-full h-full rounded-full opacity-90" style={{ backgroundColor: '#F2F2F2' }}></div>
        <div
          className="absolute h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: '#0096D2'
          }}
        ></div>
      </div>
    </div>
  );
}
