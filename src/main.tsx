import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; // Asume que aquí importas tu Tailwind CSS
import 'leaflet/dist/leaflet.css';
// Importa tus componentes de página
import { LoginPage } from "./pages/LoginPage";
import { GuestsPage } from "./pages/GuestsPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { ProtectedRoute } from "./customComponents/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";

// 1. Define el objeto de rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <ConfirmationPage />, // Página principal: Formulario de Confirmación
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <GuestsPage />
      </ProtectedRoute>
    ), // Página de Invitados: Información y Asistencia Confirmada
  },
  {
    path: "/admin",
    element: <LoginPage />, // Página de Administración: Contraseña de Acceso
  },
  // Opcional: Ruta para manejar errores o 404
  /*
  {
    path: '*',
    element: <NotFoundPage />, 
  }
  */
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
