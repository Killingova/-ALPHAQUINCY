// src/components/layout/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header 
      className="w-full flex justify-between items-center px-8 py-4" 
      style={{ backgroundColor: '#002D5F' }} 
    >
      <h1 
        style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFFFFF' }} 
      >
        Quincy Check-In
      </h1>
      <nav className="flex items-center">
        <NavLink
          to="/admin"
          className="flex items-center text-white transition-colors"
        >
          <Menu size={46} />
        </NavLink>
      </nav>
    </header>
  );
}
