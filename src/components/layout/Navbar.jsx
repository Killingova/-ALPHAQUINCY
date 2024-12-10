// src/components/layout/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Quincy Check-In</h1>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <NavLink to="/admin" style={{ color: '#1d4ed8', display: 'flex', alignItems: 'center' }}>
          <Menu size={24} />
        </NavLink>
      </nav>
    </header>
  );
}
