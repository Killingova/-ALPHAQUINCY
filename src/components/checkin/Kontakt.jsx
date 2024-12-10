// src/components/checkin/Kontakt.jsx
import React, { useState } from 'react';
import { useFormData } from '../../contexts/FormContext';
import { useFlow } from '../../contexts/FlowContext';

export default function Kontakt() {
  const { contactInfoData, setContactInfoData } = useFormData();
  const { goNextStep } = useFlow();

  const [phone, setPhone] = useState(contactInfoData.phone);
  const [email, setEmail] = useState(contactInfoData.email);
  const [street, setStreet] = useState(contactInfoData.street);
  const [houseNumber, setHouseNumber] = useState(contactInfoData.houseNumber);
  const [plz, setPlz] = useState(contactInfoData.plz);
  const [city, setCity] = useState(contactInfoData.city);

  function handleSubmit(e) {
    e.preventDefault();
    setContactInfoData({ phone, email, street, houseNumber, plz, city });
    goNextStep();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">Kontaktinformationen</h2>

      {/* Zeile 1: Telefon und E-Mail */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="phone" className="block font-semibold mb-1">Telefon:</label>
          <input
            type="text"
            id="phone"
            name="phone"
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
            name="email"
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
            name="street"
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
            name="houseNumber"
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
            name="plz"
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
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 w-full"
            placeholder="z. B. Musterstadt"
          />
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Speichern
      </button>
    </form>
  );
}
