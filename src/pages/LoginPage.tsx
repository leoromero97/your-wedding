import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ChevronLeft, Eye, EyeOff, Lock, ShieldAlert } from "lucide-react";
import Button from "@/components/Button";
import { HERO_IMAGE_URL } from "@/constants/constants";

export const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // --- LÓGICA DE SEGURIDAD Y VALIDACIÓN ---
  const sanitizeInput = (input: string) => {
    // 1. Eliminar espacios en blanco extremos
    const trimmed = input.trim();
    // 2. Bloquear patrones comunes de inyección (SQL e inyección de scripts)
    // Evitamos caracteres como: ' " ; -- < >
    const dangerousChars = /['";\--<>]/g;
    return trimmed.replace(dangerousChars, "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPassword = sanitizeInput(password);

    if (cleanPassword !== password) {
      setError("Se detectaron caracteres no permitidos.");
      return;
    }

    if (login(cleanPassword)) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Contraseña incorrecta. Inténtalo de nuevo.");
      setPassword(""); // Limpiamos por seguridad
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 flex flex-col md:flex-row">
      {/* SECCIÓN IMAGEN: Superior en Mobile, Derecha en Desktop */}
      <div className="w-full md:w-1/2 h-64 md:h-screen order-1 md:order-2 relative">
        <img
          src={HERO_IMAGE_URL}
          alt="Boda Hero"
          className="w-full h-full object-cover"
        />
        {/* Overlay para suavizar la imagen en mobile */}
        <div className="absolute inset-0 bg-black/20 md:hidden"></div>
      </div>

      {/* SECCIÓN FORMULARIO */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 order-2 md:order-1">
        <div className="max-w-md w-full space-y-4">
          <header className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-beige-900 font-serif">
              Panel de Control
            </h1>
            <p className="text-beige-600 mt-2 font-medium font-serif">
              Ingresa la clave para gestionar los invitados.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-beige-500 font-serif">
                Contraseña
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-beige-400 group-focus-within:text-beige-800 transition-colors font-serif">
                  <Lock size={18} />
                </span>

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`font-serif w-full pl-10 pr-12 py-3 bg-white border ${error ? "border-red-300" : "border-beige-200"} rounded-xl focus:ring-2 focus:ring-beige-500 outline-none transition-all shadow-sm`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-beige-400 hover:text-beige-800 transition-colors p-1 font-serif cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-2 animate-tw-animate-bounce">
                  <ShieldAlert size={14} />
                  <span className="font-serif">{error}</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              isFullWidth
            >
              Entrar al Dashboard
            </Button>
          </form>

          <footer>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              iconPosition="start"
              icon={ChevronLeft}
              isFullWidth
            >
              Volver a la invitación
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
};
