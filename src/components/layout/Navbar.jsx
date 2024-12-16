// src/components/layout/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header 
      className="w-full flex justify-between items-center px-4 py-2" 
      style={{ backgroundColor: '#002D5F' }} // Dunkler Hintergrund
    >
      <h1 
        style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFFFFF' }} // Weißer Text
      >
        Quincy Check-In
      </h1>
      <nav className="flex items-center">
        <NavLink
          to="/admin"
          className="flex items-center text-white hover:text-white/80 transition-colors"
          style={{ textDecoration: 'none' }}
        >
          <Menu size={36} />
        </NavLink>
      </nav>
    </header>
  );
}
