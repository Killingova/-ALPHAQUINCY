// src/pages/AdminDashboardPage.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/admin/AdminPanel';
import ModuleSettings from '../components/admin/ModuleSettings';
import { Settings } from 'lucide-react';

export default function AdminDashboardPage() {
  const { handleLogout, adminUser } = useAuth();
  const { modules, enableModule, disableModule, applySettings } = useSettings();
  const navigate = useNavigate();

  async function handleApplySettings() {
    applySettings();
    navigate('/');
  }

  function handleAbmelden() {
    handleLogout();
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      {/* Icon oben */}
      <div className="my-6">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
          <Settings size={56} className="text-gray-600" />
        </div>
      </div>

      <h1 className="text-6xl font-bold text-center mb-8" style={{ color: '#002D5F' }}>
        Einstellungen
      </h1>

      {/* AdminPanel zeigt ggf. den angemeldeten User, wir können ihn einfach oben ausgeben */}
      <AdminPanel adminUser={adminUser} />

      <ModuleSettings
        modules={modules}
        enableModule={enableModule}
        disableModule={disableModule}
      />

      <div className="flex space-x-4 justify-center mt-8">
        <button
          onClick={handleAbmelden}
          className="text-xl px-6 py-2 bg-red-600 text-white font-semibold rounded hover:opacity-90"
        >
          Abmelden
        </button>
        <button
          onClick={handleApplySettings}
          className="text-xl px-6 py-2 bg-[#0096D2] text-white font-semibold rounded hover:opacity-90"
        >
          Speichern
        </button>
      </div>
    </div>
  );
}
