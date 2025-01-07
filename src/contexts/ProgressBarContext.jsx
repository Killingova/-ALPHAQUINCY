// src/contexts/ProgressBarContext.jsx
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useSettings } from './SettingsContext';

export const ProgressBarContext = createContext();

function generateSteps(modules) {
  const steps = [];

  function addStep(id, name, icon) {
    let percentage;
    switch (id) {
      case 'start':
        percentage = 10;
        break;
      case 'qrScan':
        percentage = 25;
        break;
      case 'egkRead':
        percentage = 40;
        break;
      case 'anamnesis':
        percentage = 60;
        break;
      case 'contactInfo':
        percentage = 75;
        break;
      case 'complete':
        percentage = 100;
        break;
      default:
        percentage = 0;
    }
    steps.push({ id, name, percentage, icon });
  }

  // Startschritt ist immer vorhanden
  addStep('start', 'Anmeldung', 'StartIcon');

  // Optionale Schritte abhängig von den aktivierten Modulen
  if (modules.qrCodeScan) addStep('qrScan', 'QR-Code Scan', 'QrCode');
  if (modules.eGKVerification) addStep('egkRead', 'eGK Lesen', 'IdCard');
  if (modules.anamneseForm) addStep('anamnesis', 'Anamnese', 'ClipboardList');
  if (modules.contactInfoForm) addStep('contactInfo', 'Kontakt', 'BookUser');

  // Abschluss ist immer vorhanden
  addStep('complete', 'Bestätigung', 'UserCheck');

  return steps;
}

export function ProgressBarProvider({ children }) {
  const { modules } = useSettings();
  
  // Initial auf den "start"-Schritt setzen
  const [progress, setProgress] = useState(10);
  const [currentStepId, setCurrentStepId] = useState('start');

  const steps = useMemo(() => generateSteps(modules), [modules]);

  const updateProgressByStepId = useCallback((stepId) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      setProgress(prev => (prev !== step.percentage ? step.percentage : prev));
      setCurrentStepId(stepId);
    }
  }, [steps]);

  const resetProgress = useCallback(() => {
    // Zurück auf "start" setzen
    updateProgressByStepId('start');
  }, [updateProgressByStepId]);

  const contextValue = useMemo(() => ({
    progress,
    steps,
    currentStepId,
    updateProgress: updateProgressByStepId,
    resetProgress
  }), [progress, steps, currentStepId, updateProgressByStepId, resetProgress]);

  return (
    <ProgressBarContext.Provider value={contextValue}>
      {children}
    </ProgressBarContext.Provider>
  );
}

export function useProgressBar() {
  return useContext(ProgressBarContext);
}
