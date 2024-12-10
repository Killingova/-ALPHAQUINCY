// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ProgressBarProvider } from './contexts/ProgressBarContext';
import { FlowProvider } from './contexts/FlowContext';
import { DeviceProvider } from './contexts/DeviceContext';
import { FormProvider } from './contexts/FormContext';

import Notification from './components/layout/Notification';
import Navbar from './components/layout/Navbar';
import ProgressBar from './components/layout/ProgressBar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateRoute from './components/auth/PrivateRoute';
import CheckInPage from './pages/CheckInPage';

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <SettingsProvider>
          <ProgressBarProvider>
            <FlowProvider>
              <BrowserRouter>
                <DeviceProvider>
                  <FormProvider>
                    <div className="min-h-screen bg-gray-100 flex flex-col">
                      <Notification />
                      <Navbar />
                      <header className="bg-white p-4 shadow">
                        <ProgressBar />
                      </header>
                      <main className="p-4 flex-grow bg-white rounded mx-4 mt-4 mb-4">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/register-device" element={<RegistrationPage />} />
                          <Route path="/admin-login" element={<AdminLoginPage />} />
                          <Route path="/admin" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
                          <Route path="/check-in" element={<CheckInPage />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </FormProvider>
                </DeviceProvider>
              </BrowserRouter>
            </FlowProvider>
          </ProgressBarProvider>
        </SettingsProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
