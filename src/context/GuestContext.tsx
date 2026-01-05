import React, { createContext, useContext, useState, useEffect } from 'react';

// Definimos la estructura del invitado
export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  isComing: boolean;
}

interface GuestContextType {
  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id'>) => void;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export const GuestProvider = ({ children }: { children: React.ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>([]);

  // Cargar de LocalStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('wedding_guests');
    if (saved) setGuests(JSON.parse(saved));
  }, []);

  const addGuest = (newGuest: Omit<Guest, 'id'>) => {
    const guestWithId = { ...newGuest, id: crypto.randomUUID() };
    const updatedGuests = [...guests, guestWithId];
    setGuests(updatedGuests);
    localStorage.setItem('wedding_guests', JSON.stringify(updatedGuests));
  };

  return (
    <GuestContext.Provider value={{ guests, addGuest }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuests = () => {
  const context = useContext(GuestContext);
  if (!context) throw new Error('useGuests debe usarse dentro de GuestProvider');
  return context;
};