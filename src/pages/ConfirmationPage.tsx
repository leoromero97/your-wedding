import React, { useState, useEffect } from "react";
import { MapPin, Music, Shirt } from "lucide-react";
import { LOCATION, MapSection } from "@/components/custom/MapSection";
import Button from "@/components/custom/Button";
import Illustration from "@/components/custom/Illustration";

// --- CONSTANTES ---
const TARGET_DATE = new Date("2026-03-28T00:00:00");
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const ConfirmationPage = () => {
  // --- ESTADOS ---
  // Contador
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Lista de canciones
  const [songInput, setSongInput] = useState("");
  const [playlist, setPlaylist] = useState<{ song: string }[]>([]);

  // Modal de Regalo
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LÓGICA DEL CONTADOR ---
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        setTimeLeft({
          months: Math.floor(d / 30),
          days: d % 30,
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- LÓGICA DE CANCIONES (LocalStorage) ---
  useEffect(() => {
    const savedSongs = localStorage.getItem("party_playlist");
    if (savedSongs) setPlaylist(JSON.parse(savedSongs));
  }, []);

  const handleAddSong = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!songInput.trim()) return;

    const newEntry = { song: songInput };
    const updatedPlaylist = [newEntry, ...playlist].slice(0, 5); // Solo las últimas 5

    setPlaylist(updatedPlaylist);
    localStorage.setItem("party_playlist", JSON.stringify(updatedPlaylist));
    setSongInput("");
  };

  return (
    <div className="min-h-screen bg-white text-beige-800 font-sans">
      {/* 1. SECCIÓN HERO */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={HERO_IMAGE_URL}
          alt="Evento"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
        <div className="relative z-10 text-center text-beige-100 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-widest">
            ¡Nos casamos!
          </h1>
          <p className="text-xl md:text-2xl font-light italic mb-6">
            Mili & Nico
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-widest">
            28 | 03 | 2026
          </h2>
        </div>
      </header>

      <main>
        {/* 2. CONTADOR Y CTA */}
        <section className="py-16 bg-beige-100 text-center px-4">
          <h2 className="text-3xl font-semibold mb-8">Falta muy poco...</h2>
          <div className="flex justify-center gap-4 md:gap-8 mb-10">
            {[
              { label: "Meses", value: timeLeft.months },
              { label: "Días", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Minutos", value: timeLeft.minutes },
            ]
              .filter((item) => item.value > 0)
              .map((item) => (
                <div key={item.label} className="flex flex-col min-w-[80px]">
                  <span className="text-4xl md:text-6xl font-bold text-stone-700">
                    {item.value}
                  </span>
                  <span className="text-sm uppercase tracking-tighter">
                    {item.label}
                  </span>
                </div>
              ))}
          </div>
          <Button variant="filled">Confirmar asistencia</Button>
        </section>

        {/* 3. LUGAR Y UBICACIÓN */}
        <section className="py-16 grid md:grid-cols-2 container mx-auto px-6 gap-12 border-b">
          <div>
            <h2 className="text-3xl font-bold mb-6 italic">¿Dónde?</h2>
            <div className="flex gap-2 items-center">
              <MapPin className="text-beige-700 w-5 h-5" />
              <p className="text-lg font-semibold">Ubicación:</p>
            </div>
            <p className="mb-4 text-beige-700">{LOCATION.address}</p>
            <a href={LOCATION.url} target="_blank" rel="noopener noreferrer">
              Ver en Google Maps
            </a>

            <div className="mt-8 flex gap-8">
              <div>
                <p className="font-semibold italic">Entrada</p>
                <p className="text-beige-700">18:00 hs</p>
              </div>
              <div>
                <p className="font-semibold italic">Finalización</p>
                <p className="text-beige-700">03:00 hs</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 h-64 md:h-full rounded-lg flex items-center justify-center italic text-gray-500">
            <MapSection />
          </div>
        </section>

        {/* 4. DRESS CODE */}
        <section className="py-16 text-center bg-beige-50 border-b flex flex-col items-center">
          <Illustration
            name="dress"
            colorPrimary="#e7e5e4"
            colorSecondary="#fafaf9"
            colorTertiary="black"
            className="h-24 w-24 mb-4"
          />
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest">
            Dress Code
          </h2>
          <p className="text-beige-700 italic text-lg">
            El código de vestimenta es:{" "}
            <span className="font-bold text-beige-800">Elegante</span>
          </p>
        </section>

        {/* 5. MÚSICA */}
        <section className="py-16 bg-beige-100 px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 italic">
              ¡Podes recomendar alguna canción para bailar! 💃
            </h2>
            <form onSubmit={handleAddSong} className="flex flex-col gap-4 mb-8">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nombre de la canción y artista"
                  className="p-3 border border-beige-800 rounded-md w-full flex grow"
                  value={songInput}
                  onChange={(e) => setSongInput(e.target.value)}
                />
                <Button variant="outlined">+</Button>
              </div>
            </form>

            <div className="text-left bg-beige-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold uppercase mb-4 text-beige-400">
                Últimas agregadas
              </h3>
              <ul className="divide-y">
                {playlist.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between">
                    <span className="font-medium">{item.song}</span>
                  </li>
                ))}
                {playlist.length === 0 && (
                  <p className="text-beige-400 italic text-sm text-center">
                    Aún no hay canciones...
                  </p>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. REGALO Y MODAL */}
        <section className="py-20 text-center px-6">
          <p className="max-w-lg mx-auto text-xl mb-8">
            El mejor regalo es que vengas, pero si deseás regalarme algo, podés
            colaborar con mis sueños y anhelos ✨<br />
            <strong className="block mt-4">¡Muchas gracias!</strong>
          </p>
          <Button onClick={() => setIsModalOpen(true)} variant="filled">
            Hacer regalo
          </Button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-beige-100 text-center border-t border-beige-200">
        <p className="italic text-lg mb-2">
          ¡Gracias por acompañarme en este momento tan importante! 🤍
        </p>
        <p className="text-beige-500 text-xs">
          Copyright 2026. Todos los derechos reservados. - Creado con ❤️ por{" "}
          <a
            href="https://leogromero-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leo Romero
          </a>
        </p>
      </footer>

      {/* MODAL (Renderizado condicional) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-beige-50 w-full max-w-md p-8 rounded-2xl relative shadow-2xl">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="justify-self-end"
            >
              &times;
            </Button>
            <h2 className="text-3xl font-bold mb-4 italic">
              Colaborar con mis sueños
            </h2>
            <p className="text-beige-700 mb-6">
              Podés realizar una transferencia a la siguiente cuenta bancaria:
            </p>
            <div className="bg-beige-100 p-4 rounded-lg border border-stone-200">
              <p className="text-sm text-gray-500 uppercase font-bold">Alias</p>
              <p className="text-xl font-mono text-stone-800 mb-4">
                SUEÑOS.MIOS.2026
              </p>
              <p className="text-sm text-gray-500 uppercase font-bold">Banco</p>
              <p className="text-md text-stone-800">
                Banco Santander - Cuenta Corriente
              </p>
            </div>
                        <Button
              onClick={() => setIsModalOpen(false)}
            >
              Copiar alias
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outlined"
            >
              Entendido
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
