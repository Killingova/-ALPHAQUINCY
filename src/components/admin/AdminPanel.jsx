// src/components/admin/AdminPanel.jsx
import React from 'react';

export default function AdminPanel({ adminUser, handleLogout }) {
  return (
    <>
      <h1 style={{fontWeight:'bold', fontSize:'1.25rem', marginBottom:'1rem'}}>
        Willkommen im Admin-Dashboard, {adminUser?.username}
      </h1>
      <button
        style={{
          background:'#dc2626',
          color:'white',
          padding:'0.5rem 1rem',
          borderRadius:'5px',
          border:'none',
          marginBottom:'1rem'
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
