// src/contexts/FlowContext.jsx
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useSettings } from './SettingsContext';
import { useProgressBar } from './ProgressBarContext';

const FlowContext = createContext();

function generateFlowSteps(modules) {
  const flow = ['start'];
  if (modules.qrCodeScan) flow.push('qrScan');
  if (modules.eGKVerification) flow.push('egkRead');
  if (modules.anamneseForm) flow.push('anamnesis');
  if (modules.contactInfoForm) flow.push('contactInfo');
  flow.push('complete');
  return flow;
}

export function FlowProvider({ children }) {
  const { modules } = useSettings();
  const { updateProgress } = useProgressBar();

  const steps = useMemo(() => generateFlowSteps(modules), [modules]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setCurrentStep = useCallback((index) => {
    const stepId = steps[index];
    updateProgress(stepId);
    setCurrentIndex(index);
  }, [steps, updateProgress]);

  const goNextStep = useCallback(() => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(currentIndex + 1);
    }
  }, [currentIndex, steps, setCurrentStep]);

  const goPreviousStep = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentStep(currentIndex - 1);
    }
  }, [currentIndex, setCurrentStep]);

  const resetFlow = useCallback(() => {
    // Zurück zum ersten Schritt (start)
    setCurrentStep(0);
  }, [setCurrentStep]);

  const currentStep = steps[currentIndex];

  return (
    <FlowContext.Provider value={{ steps, currentStep, currentIndex, goNextStep, goPreviousStep, resetFlow }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  return useContext(FlowContext);
}
