// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Entferne hier 'fixed bottom-0', damit der Footer normal im Layoutfluss ist
    <footer className="w-full bg-[#e4e4e4] p-8 text-center">
      <p className="text-2xl text-black">
        © {currentYear} Quincy Check-In. Alle Rechte vorbehalten.
      </p>
    </footer>
  );
};

export default Footer;
