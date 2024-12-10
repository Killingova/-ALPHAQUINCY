// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  async function handleLogin(username, password) {
    // Hier wird der login aus authApi verwendet, z. B.:
    const response = await fetch('/api/login'); // Pseudocode
    // In Wirklichkeit: const admin = await login(username, password);
    // Wenn admin gefunden
    setIsLoggedIn(true);
    setAdminUser({ username }); // Pseudo
    return true;
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setAdminUser(null);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, adminUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
