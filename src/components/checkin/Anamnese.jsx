// src/components/checkin/Anamnese.jsx
import React, { useState } from 'react';
import { useFormData } from '../../contexts/FormContext';
import { useFlow } from '../../contexts/FlowContext';
import { ClipboardList } from 'lucide-react';

export default function Anamnese({ onCancel }) {
  const { anamnesisData, setAnamnesisData } = useFormData();
  const { goNextStep } = useFlow();

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="my-6 flex flex-col items-center">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
          <ClipboardList size={56} className="text-gray-600" />
        </div>
      </div>
      <h1 className="text-6xl font-bold text-center mb-8" style={{ color: '#002D5F' }}>
        Anamnese-Formular
      </h1>

      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-4 rounded shadow space-y-4">
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

        <div className="flex justify-center space-x-6 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="text-xl px-6 py-2 bg-[#919191] text-white font-semibold rounded hover:opacity-90"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="text-xl px-6 py-2 bg-[#0096D2] text-white font-semibold rounded hover:opacity-90"
          >
            Speichern
          </button>
        </div>
      </form>
    </div>
  );
}
