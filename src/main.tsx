import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "leaflet/dist/leaflet.css";
// Importa tus componentes de página
import { LoginPage } from "./pages/LoginPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { JustMarriedPage } from "./pages/JustMarriedPage";
import { WeddingProvider } from "./context/WeddingContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConfirmationPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <JustMarriedPage />
      </ProtectedRoute>
    ), // Página de Invitados: Información y Asistencia Confirmada
  },
  {
    path: "/login",
    element: <LoginPage />,
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
      <WeddingProvider>
        <RouterProvider router={router} />
      </WeddingProvider>
    </AuthProvider>
  </React.StrictMode>
);
