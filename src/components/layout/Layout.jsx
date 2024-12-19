// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ProgressBar from './ProgressBar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <header className="bg-blue-950 shadow" style={{ backgroundColor: '#002D5F' }}>
        <ProgressBar />
      </header>
      <main className="p-4 flex-grow bg-white rounded mx-4 mt-4 mb-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
