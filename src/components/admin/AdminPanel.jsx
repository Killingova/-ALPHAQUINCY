// src/components/admin/AdminPanel.jsx
import React from 'react';

export default function AdminPanel({ adminUser }) {
  return (
    <div className="mb-8 text-center">
      {adminUser?.username && (
        <p className="text-2xl text-gray-800 font-semibold mb-2">
          Angemeldet als: {adminUser.username}
        </p>
      )}
    </div>
  );
}
