// src/pages/ConfirmationPage.tsx

import React from 'react';
import { Button } from '@/components/ui/button'; // Ejemplo de shadcn/ui

export const GuestsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Confirma tu Asistencia 👋</h1>
      <p className="text-lg mb-8 text-gray-600">
        Por favor, rellena el siguiente formulario para confirmar tu presencia.
      </p>
      
      {/* Aquí iría tu formulario, quizás usando componentes de shadcn/ui */}
      <Button className="mt-4">Confirmar</Button>
      
      <p className="mt-8 text-sm">
        <a href="/info" className="text-blue-500 hover:text-blue-700">Ver lista de invitados confirmados</a>
      </p>
    </div>
  );
};