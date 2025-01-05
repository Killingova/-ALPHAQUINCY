// src/components/admin/ModuleSettings.jsx

import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export default function ModuleSettings({ modules, enableModule, disableModule }) {
  function toggleModule(name) {
    if (modules[name]) {
      disableModule(name);
    } else {
      enableModule(name);
    }
  }

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <ul className="space-y-4 text-2xl text-black">
          {Object.keys(modules).map((name) => {
            const active = modules[name];
            const Icon = active ? CheckCircle : Circle;

            return (
              <li
                key={name}
                onClick={() => toggleModule(name)}
                className="flex items-center w-full px-4 cursor-pointer"
              >
                {/* Name links, nimmt den Platz nach rechts ein */}
                <span className="flex-1 text-left">{formatModuleName(name)}</span>
                
                {/* Größeres Icon rechts, mit zusätzlichem Abstand zum Namen */}
                <Icon
                  className={active ? 'text-green-600' : 'text-gray-800'}
                  size={48}
                  style={{ marginLeft: '40px' }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function formatModuleName(name) {
  const map = {
    qrCodeScan: 'QR-Code-Scan',
    eGKVerification: 'eGK-Verifizierung',
    anamneseForm: 'Anamnesebogen',
    contactInfoForm: 'Kontaktformular',
  };
  return map[name] || name;
}
