// src/components/checkin/PatientForm.jsx
import React from 'react';
import { useFlow } from '../../contexts/FlowContext';
import Anamnese from './Anamnese';
import Kontakt from './Kontakt';

export default function PatientForm() {
  const { currentStep } = useFlow();

  if (currentStep === 'anamnesis') {
    return <Anamnese />;
  }

  if (currentStep === 'contactInfo') {
    return <Kontakt />;
  }

  return null;
}
