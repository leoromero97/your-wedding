import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { db } from "../lib/firebase";

export interface Guest {
  id?: string;
  firstName: string;
  lastName: string;
  isComing: boolean;
  tableNumber?: number;
}

export interface Song {
  id?: string;
  song: string;
}

interface WeddingContextType {
  guests: Guest[];
  songs: Song[];
  addGuest: (guest: Guest) => void;
  addSong: (song: Song) => void;
  deleteGuest?: (id: string) => void;
  deleteSong?: (id: string) => void;
  updateGuestTable?: (id: string, tableNumber: number) => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider = ({ children }: { children: ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const guestsRef = ref(db, "guests");
    const songsRef = ref(db, "songs");

const unsubscribeGuests = onValue(guestsRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    setGuests([]);
    return;
  }
  
  // Tipamos explícitamente la lista como Guest[]
  const list: Guest[] = Object.entries(data).map(([id, val]) => {
    const guestData = val as Guest; // Cast del valor de Firebase
    return {
      ...guestData,
      id, // Sobrescribimos o añadimos el ID de Firebase
    };
  });
  
  setGuests(list);
});

const unsubscribeSongs = onValue(songsRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    setSongs([]);
    return;
  }

  const list: Song[] = Object.entries(data).map(([id, val]) => {
    const songData = val as Song;
    return {
      ...songData,
      id,
    };
  });

  setSongs(list);
});

    return () => {
      unsubscribeGuests();
      unsubscribeSongs();
    };
  }, []);

  // Funciones de escritura (Están perfectas tal cual las tenías)
  const addGuest = (newGuest: Guest) => push(ref(db, "guests"), newGuest);
  const addSong = (newSong: Song) => push(ref(db, "songs"), newSong);
  const deleteGuest = (id: string) => remove(ref(db, `guests/${id}`));
  const deleteSong = (id: string) => remove(ref(db, `songs/${id}`));
  const updateGuestTable = (id: string, tableNumber: number) => 
    update(ref(db, `guests/${id}`), { tableNumber });

  return (
    <WeddingContext.Provider
      value={{
        guests,
        songs,
        addGuest,
        addSong,
        deleteGuest,
        deleteSong,
        updateGuestTable,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context)
    throw new Error("useWedding debe usarse dentro de WeddingProvider");
  return context;
};
