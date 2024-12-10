import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white p-4 text-center border-t mt-auto">
      <p className="text-sm text-gray-500">© {currentYear} Quincy Check-In. Alle Rechte vorbehalten.</p>
    </footer>
  );
};

export default Footer;
