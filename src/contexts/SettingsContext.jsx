// src/contexts/SettingsContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNotification } from './NotificationContext';

const SettingsContext = createContext();

const initialState = {
  qrCodeScan: true,
  eGKVerification: false,
  anamneseForm: false,
  contactInfoForm: false,
};

export function SettingsProvider({ children }) {
  const [modules, setModules] = useState(initialState);
  const { addNotification } = useNotification();

  function enableModule(name) {
    setModules(prev => ({ ...prev, [name]: true }));
    addNotification(`Das Modul "${name}" wurde aktiviert.`, 'success', 2000);
  }

  function disableModule(name) {
    setModules(prev => ({ ...prev, [name]: false }));
    addNotification(`Das Modul "${name}" wurde deaktiviert.`, 'info', 2000);
  }

  function applySettings() {
    addNotification('Moduleinstellungen übernommen!', 'success', 2000);
  }

  return (
    <SettingsContext.Provider value={{ modules, enableModule, disableModule, applySettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
