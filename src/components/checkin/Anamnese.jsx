// src/components/checkin/Anamnese.jsx
import React, { useState } from 'react';
import { useFormData } from '../../contexts/FormContext';
import { useFlow } from '../../contexts/FlowContext';

export default function Anamnese() {
  const { anamnesisData, setAnamnesisData } = useFormData();
  const { goNextStep } = useFlow();

  // Lokale Zustände für alle Felder
  const [allergies, setAllergies] = useState(anamnesisData.allergie_unvertraeglichkeit);
  const [creatinine, setCreatinine] = useState(anamnesisData.kreatinin);
  const [freetext, setFreetext] = useState(anamnesisData.freitext);
  const [gender, setGender] = useState(anamnesisData.geschlecht);
  const [weight, setWeight] = useState(anamnesisData.gewicht);
  const [height, setHeight] = useState(anamnesisData.groesse);
  const [pregnant, setPregnant] = useState(anamnesisData.schwanger);
  const [nursing, setNursing] = useState(anamnesisData.stillend);

  function handleSubmit(e) {
    e.preventDefault();
    // Aktualisiert die Daten im globalen State
    setAnamnesisData({
      allergie_unvertraeglichkeit: allergies,
      kreatinin: creatinine,
      freitext: freetext,
      geschlecht: gender,
      gewicht: weight,
      groesse: height,
      schwanger: pregnant,
      stillend: nursing
    });
    goNextStep();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">Anamnese-Formular</h2>

      {/* 1. Zeile: Allergie/Unverträglichkeit links, Kreatinin rechts */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Allergie / Unverträglichkeit:</label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="border p-2 w-full"
            placeholder="z. B. Penicillin"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Kreatinin in mg/dl:</label>
          <input
            type="number"
            step="0.01"
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
            className="border p-2 w-full"
            placeholder="z. B. 1.20"
          />
        </div>
      </div>

      {/* 2. Zeile: Freitext links, Geschlecht rechts */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Freitext:</label>
          <input
            type="text"
            value={freetext}
            onChange={(e) => setFreetext(e.target.value)}
            className="border p-2 w-full"
            placeholder="z. B. Beschwerden"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Geschlecht:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Bitte wählen</option>
            <option value="männlich">Männlich</option>
            <option value="weiblich">Weiblich</option>
            <option value="divers">Divers</option>
          </select>
        </div>
      </div>

      {/* 3. Zeile: Gewicht in Kg links, Schwanger rechts */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Gewicht in Kg:</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border p-2 w-full"
            placeholder="z. B. 70"
          />
        </div>
        <div className="flex-1 flex items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={pregnant}
              onChange={(e) => setPregnant(e.target.checked)}
            />
            <span>Schwanger</span>
          </label>
        </div>
      </div>

      {/* 4. Zeile: Größe in cm links, Stillend rechts */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Größe in cm:</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border p-2 w-full"
            placeholder="z. B. 175"
          />
        </div>
        <div className="flex-1 flex items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={nursing}
              onChange={(e) => setNursing(e.target.checked)}
            />
            <span>Stillend</span>
          </label>
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Speichern
      </button>
    </form>
  );
}
