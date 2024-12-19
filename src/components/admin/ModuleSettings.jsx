// src/components/admin/ModuleSettings.jsx
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export default function ModuleSettings({ modules, enableModule, disableModule }) {
  const handleToggle = (modName) => {
    if (modules[modName]) {
      disableModule(modName);
    } else {
      enableModule(modName);
    }
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        {/* Liste der Module */}
        <ul className="space-y-4 text-2xl text-black">
          {Object.keys(modules).map((modName) => {
            const isActive = modules[modName];
            const IconComponent = isActive ? CheckCircle : Circle;

            return (
              <li
                key={modName}
                className="flex items-center justify-center space-x-4 cursor-pointer"
                onClick={() => handleToggle(modName)}
              >
                <IconComponent className={isActive ? "text-green-600" : "text-gray-800"} size={32} />
                <span>{formatModuleName(modName)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// Hilfsfunktion, um den Modulnamen schöner darzustellen
function formatModuleName(name) {
  // z. B. aus "qrCodeScan" -> "QR-Code-Scan"
  // aus "eGKVerification" -> "eGK-Verifizierung"
  // aus "anamneseForm" -> "Anamnesebogen"
  // aus "contactInfoForm" -> "Kontaktformular"
  const mappings = {
    qrCodeScan: 'QR-Code-Scan',
    eGKVerification: 'eGK-Verifizierung',
    anamneseForm: 'Anamnesebogen',
    contactInfoForm: 'Kontaktformular'
  };
  return mappings[name] || name;
}
