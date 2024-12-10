// src/pages/AdminDashboardPage.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';

import AdminPanel from '../components/admin/AdminPanel';
import ModuleSettings from '../components/admin/ModuleSettings';

export default function AdminDashboardPage() {
  const { handleLogout, adminUser } = useAuth();
  const { modules, enableModule, disableModule, applySettings } = useSettings();
  const navigate = useNavigate();

  async function handleApplySettings() {
    applySettings();
    // Nach Übernahme der Einstellungen zurück zur Startseite
    navigate('/');
  }

  return (
    <div style={{padding:'1rem'}}>
      <AdminPanel adminUser={adminUser} handleLogout={handleLogout} />
      <ModuleSettings
        modules={modules}
        enableModule={enableModule}
        disableModule={disableModule}
        handleApplySettings={handleApplySettings}
      />
    </div>
  );
}
