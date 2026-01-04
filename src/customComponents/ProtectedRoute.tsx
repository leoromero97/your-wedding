// src/components/ProtectedRoute.tsx
import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Importa el hook que creamos

interface ProtectedRouteProps {
  children: ReactNode; // El componente que se va a proteger (ej: AdminDashboard)
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de inicio
    // 'replace: true' asegura que el usuario no pueda simplemente presionar "atrás" para acceder.
    return <Navigate to="/" replace />; 
  }

  return children; // Si está autenticado, renderiza el componente hijo
};