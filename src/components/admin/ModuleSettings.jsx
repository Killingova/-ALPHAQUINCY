// src/components/admin/ModuleSettings.jsx
import React from 'react';
import { Check } from 'lucide-react';

export default function ModuleSettings({ modules, enableModule, disableModule, handleApplySettings }) {
  return (
    <div>
      <h2 className="font-bold text-base mb-2">Moduleinstellungen:</h2>
      <ul className="list-none p-0">
        {Object.keys(modules).map((modName) => {
          const isActive = modules[modName];

          return (
            <li key={modName} className="mb-2 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => {
                  if (isActive) {
                    disableModule(modName);
                  } else {
                    enableModule(modName);
                  }
                }}
              />
              <span>{modName}</span>
              {isActive && <Check className="text-green-600 w-4 h-4" />}
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        <button
          onClick={handleApplySettings}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Speichern
      </button>
      </div>
    </div>
  );
}
