import React from 'react';

// Diese Komponente zeigt einen Hinweis an, dass das Gerät noch nicht registriert ist.
// Zusätzlich kann sie eine kurze Erklärung liefern, warum die Registrierung notwendig ist.
export default function DeviceNotRegistered() {
  return (
    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-200 rounded">
      <h2 className="font-semibold text-yellow-800">Gerät nicht registriert!</h2>
      <p className="text-sm text-yellow-700 mt-2">
        Dieses Tablet ist noch nicht im System hinterlegt. Bitte führen Sie nun die
        Registrierung durch, indem Sie die benötigten Daten eingeben.
      </p>
    </div>
  );
}
