// src/components/checkin/Kontakt.jsx
import React, { useState } from 'react';
import { useFormData } from '../../contexts/FormContext';
import { useFlow } from '../../contexts/FlowContext';
import { NotebookPen } from 'lucide-react';

export default function Kontakt({ onCancel }) {
  const { contactInfoData, setContactInfoData } = useFormData();
  const { goNextStep } = useFlow();

  const [phone, setPhone] = useState(contactInfoData.phone || '');
  const [email, setEmail] = useState(contactInfoData.email || '');
  const [street, setStreet] = useState(contactInfoData.street || '');
  const [houseNumber, setHouseNumber] = useState(contactInfoData.houseNumber || '');
  const [plz, setPlz] = useState(contactInfoData.plz || '');
  const [city, setCity] = useState(contactInfoData.city || '');

  function handleSubmit(e) {
    e.preventDefault();
    setContactInfoData({ phone, email, street, houseNumber, plz, city });
    goNextStep();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      {/* Icon und Überschrift oben, wie bei den anderen Screens */}
      <div className="my-6 flex flex-col items-center">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
          <NotebookPen size={56} className="text-gray-600" />
        </div>
      </div>
      <h1 className="text-6xl font-bold text-center mb-8" style={{ color: '#002D5F' }}>
        Kontaktinformationen
      </h1>

      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-4 rounded shadow space-y-4">
        {/* Zeile 1: Telefon und E-Mail */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="phone" className="block font-semibold mb-1">Telefon:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full"
              placeholder="z. B. +49 123 456789"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="block font-semibold mb-1">E-Mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              placeholder="z. B. name@example.com"
            />
          </div>
        </div>

        {/* Zeile 2: Straße und Hausnummer */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="street" className="block font-semibold mb-1">Straße:</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="border p-2 w-full"
              placeholder="z. B. Musterstraße"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="houseNumber" className="block font-semibold mb-1">Hausnummer:</label>
            <input
              type="text"
              id="houseNumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className="border p-2 w-full"
              placeholder="z. B. 12a"
            />
          </div>
        </div>

        {/* Zeile 3: PLZ und Ort */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="plz" className="block font-semibold mb-1">PLZ:</label>
            <input
              type="text"
              id="plz"
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
              className="border p-2 w-full"
              placeholder="z. B. 12345"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="city" className="block font-semibold mb-1">Ort:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 w-full"
              placeholder="z. B. Musterstadt"
            />
          </div>
        </div>

        {/* Buttons unten: Abbrechen und Speichern */}
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
