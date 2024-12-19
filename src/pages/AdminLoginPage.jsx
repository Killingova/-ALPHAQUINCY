// src/pages/AdminLoginPage.jsx
import React from 'react';
import AdminLoginForm from '../components/auth/AdminLoginForm';
import { LogIn } from 'lucide-react'; // Symbolisiert den Admin-Login

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      {/* Icon und Überschrift im selben Stil wie RegistrationPage */}
      <div className="my-6">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
          <LogIn size={56} className="text-gray-600" />
        </div>
      </div>

      <h1 className="text-6xl font-bold text-center mb-8" style={{ color: '#002D5F' }}>
        Administrator
      </h1>

      <AdminLoginForm />
    </div>
  );
}
