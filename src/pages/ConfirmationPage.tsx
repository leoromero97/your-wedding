import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import Button from "@/components/Button";
import Illustration from "@/components/Illustration";
import Hero from "@/components/Hero";
import {
  BANK_DATA,
  LOCATION_CHURCH,
  LOCATION_PARTY,
} from "@/constants/constants";
import { useWedding } from "@/context/WeddingContext";
import Location from "@/components/sections/Location";
import heroImage from "@/assets/hero-mili-nico.jpg";
import Counter from "@/components/sections/Counter";

export const ConfirmationPage = () => {
  const { addGuest, addSong, songs } = useWedding();
  const [songInput, setSongInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    isComing: true,
  });
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  // Lógica para ocultar el botón cuando el footer entra en vista
  useEffect(() => {
    const handleScroll = () => {
      // Calculamos cuánto falta para llegar al final
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 150; // 150px antes del final

      setShowFloatingButton(scrollPosition < threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- MANEJADORES ---
  const handleConfirmSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    addGuest?.(formData);
    setIsConfirmModalOpen(false);
    setFormData({ firstName: "", lastName: "", isComing: true });
    alert("¡Gracias por confirmar!");
  };

  const handleCopyAlias = async () => {
    try {
      await navigator.clipboard.writeText(BANK_DATA.alias);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  const handleAddSong = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!songInput.trim()) return;

    // Guardamos en Firebase a través del contexto
    addSong({ song: songInput });
    setSongInput("");
  };

  useEffect(() => {
    if (isModalOpen || isConfirmModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen, isConfirmModalOpen]);

  return (
    <div className="min-h-screen bg-white text-beige-800 font-sans">
      <Hero
        title="¡Nos casamos!"
        subtitle="Mili & Nico"
        description="28 | 03 | 2026"
        imageUrl={heroImage}
      />

      <main>
        <Counter buttonTypes={{ onClick: () => setIsConfirmModalOpen(true) }} />
        {/* BOTÓN FLOTANTE MOBILE */}
        <div
          className={`
          md:hidden fixed bottom-4 left-0 w-full px-6 z-40 transition-all duration-500
          ${showFloatingButton ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}
        `}
        >
          <Button
            variant="filled"
            isFullWidth
            className="shadow-2xl shadow-black/20 text-lg"
            onClick={() => setIsConfirmModalOpen(true)}
          >
            Confirmar asistencia
          </Button>
        </div>
        <Location
          address={LOCATION_CHURCH.address}
          addressUrl={LOCATION_CHURCH.addressUrl}
          startHour={LOCATION_CHURCH.startHour}
          title={LOCATION_CHURCH.title}
          type={LOCATION_CHURCH.type}
          iframeSrc={LOCATION_CHURCH.iframeSrc}
        />
        <Location
          address={LOCATION_PARTY.address}
          addressUrl={LOCATION_PARTY.addressUrl}
          startHour={LOCATION_PARTY.startHour}
          title={LOCATION_PARTY.title}
          type={LOCATION_PARTY.type}
          iframeSrc={LOCATION_PARTY.iframeSrc}
        />

        {/* 4. DRESS CODE */}
        <section className="py-16 text-center bg-beige-50 border-b flex flex-col items-center">
          <Illustration
            name="dress"
            colorPrimary="#e7e5e4"
            colorSecondary="#fafaf9"
            className="h-24 w-24 mb-4"
          />
          <h2 className="text-2xl font-bold mb-4 tracking-widest text-beige-900">
            Dress Code
          </h2>
          <p className="text-beige-700 italic text-lg">
            El código de vestimenta es:{" "}
            <span className="font-bold text-beige-800">Elegante</span>
          </p>
        </section>

        {/* 5. MÚSICA (Conectado a Firebase) */}
        <section className="py-16 bg-beige-100 px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 italic text-beige-900">
              ¡Podes recomendar alguna canción para bailar! 💃
            </h2>
            <form onSubmit={handleAddSong} className="flex gap-2 mb-8">
              <input
                type="text"
                placeholder="Nombre de la canción y artista"
                className="p-3 border border-beige-300 bg-white rounded-md w-full focus:ring-2 focus:ring-beige-500 outline-none"
                value={songInput}
                onChange={(e) => setSongInput(e.target.value)}
                maxLength={50}
              />
              <Button variant="filled" type="submit" className="px-6">
                +
              </Button>
            </form>

            <div className="text-left bg-beige-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xs font-bold uppercase mb-4 text-beige-400 tracking-widest">
                Últimas agregadas
              </h3>
              <ul className="divide-y divide-beige-200">
                {/* Cambia esto en la sección de música */}
                {songs
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((item, index) => (
                    <li key={item.id || index} className="py-3 text-beige-800">
                      <span className="font-medium">{item.song}</span>
                    </li>
                  ))}
                {songs.length === 0 && (
                  <p className="text-beige-400 italic text-sm text-center py-4">
                    Aún no hay canciones...
                  </p>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. REGALO Y MODAL */}
        <section className="py-20 text-center px-6">
          <p className="max-w-lg mx-auto text-xl mb-8 text-beige-800">
            El mejor regalo es que vengas, pero si deseás regalarme algo, podés
            colaborar con mis sueños y anhelos ✨<br />
            <strong className="block mt-4">¡Muchas gracias!</strong>
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="filled"
            className="justify-self-center"
          >
            Hacer regalo
          </Button>
        </section>
      </main>

      <footer className="py-12 md:py-16 px-4 bg-beige-100 text-center border-t border-beige-200 text-beige-500 gap-8 flex flex-col">
        <p className="italic text-lg text-beige-800">
          ¡Gracias por acompañarme en este momento tan importante! 🤍
        </p>
        <div className="flex w-full items-center justify-center">
          <Button variant="filled" onClick={() => setIsConfirmModalOpen(true)}>
            Confirmar asistencia
          </Button>
        </div>

        <p className="text-xs">
          Copyright 2026. Todos los derechos reservados. - Creado por{" "}
          <a
            href="https://leogromero-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Leo Romero
          </a>
        </p>
      </footer>
      {/* MODAL CONFIRMACIÓN ASISTENCIA */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleConfirmSubmission}
            className="bg-beige-50 w-full max-w-md p-8 rounded-2xl shadow-2xl space-y-6"
          >
            <h2 className="text-2xl font-bold italic text-beige-900 border-b border-beige-200 pb-2">
              Confirmar asistencia
            </h2>

            <div className="space-y-4">
              <input
                required
                type="text"
                placeholder="Nombre"
                className="w-full p-3 bg-white border border-beige-300 rounded-lg focus:ring-2 focus:ring-beige-500 outline-none"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                maxLength={30}
              />
              <input
                required
                type="text"
                placeholder="Apellido"
                className="w-full p-3 bg-white border border-beige-300 rounded-lg focus:ring-2 focus:ring-beige-500 outline-none"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                maxLength={30}
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-beige-700">
                ¿Vas a asistir?
              </p>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-beige-100 rounded-lg border border-beige-200">
                <input
                  type="radio"
                  checked={formData.isComing === true}
                  onChange={() => setFormData({ ...formData, isComing: true })}
                  className="accent-beige-800 w-4 h-4"
                />
                <span className="text-beige-900">Sí, voy!</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-beige-100 rounded-lg border border-beige-200">
                <input
                  type="radio"
                  checked={formData.isComing === false}
                  onChange={() => setFormData({ ...formData, isComing: false })}
                  className="accent-beige-800 w-4 h-4"
                />
                <span className="text-beige-900">No puedo asistir</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" isFullWidth>
                Confirmar
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL REGALO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-beige-50 w-full max-w-md p-8 rounded-2xl relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-6 text-2xl text-beige-400 hover:text-beige-800"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4 italic text-beige-900">
              Colaborar con mis sueños
            </h2>
            <p className="text-beige-700 mb-6">
              Podés realizar una transferencia a la siguiente cuenta bancaria:
            </p>
            <div className="bg-beige-100 p-6 rounded-xl border border-beige-200 space-y-4">
              <div>
                <p className="text-xs text-beige-500 uppercase font-bold">
                  Alias
                </p>
                <p className="text-xl font-mono text-beige-900">
                  {BANK_DATA.alias}
                </p>
              </div>
              <div>
                <p className="text-xs text-beige-500 uppercase font-bold">
                  Banco
                </p>
                <p className="text-md text-beige-800">{BANK_DATA.bankName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-8">
              <Button
                onClick={handleCopyAlias}
                variant={copied ? "outlined" : "filled"}
                icon={copied ? Check : Copy}
                className="grow"
              >
                {copied ? "¡Copiado!" : "Copiar alias"}
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outlined"
                className="grow"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
