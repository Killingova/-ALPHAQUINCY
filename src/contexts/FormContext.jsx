// src/contexts/FormContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  // Felder entsprechend anamneseFields-Definition
  const [anamnesisData, setAnamnesisData] = useState({
    allergie_unvertraeglichkeit: '',
    kreatinin: '',
    freitext: '',
    geschlecht: '',
    gewicht: '',
    schwanger: false,
    groesse: '',
    stillend: false
  });

  const [contactInfoData, setContactInfoData] = useState({ phone: '', email: '' });

  return (
    <FormContext.Provider value={{ anamnesisData, setAnamnesisData, contactInfoData, setContactInfoData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  return useContext(FormContext);
}
