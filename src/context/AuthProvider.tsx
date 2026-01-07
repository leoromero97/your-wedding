// src/contexts/AuthProvider.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define la estructura del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// 1. Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define la contraseña simple (usar un método más seguro en producción, como hashing)
const ADMIN_PASSWORD = import.meta.env.VITE_PASSWORD_ADMIN; 

// 2. Define el proveedor
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicialmente no autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Lógica de inicio de sesión
  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Opcional: guardar estado en localStorage aquí
      return true;
    }
    return false;
  };

  // Lógica de cierre de sesión
  const logout = () => {
    setIsAuthenticated(false);
    // Opcional: limpiar localStorage aquí
  };

  const value = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Hook para usar la autenticación fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};