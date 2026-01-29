import React, { useEffect, useState } from "react";
import Button, { type ButtonTypes } from "../Button";
import { TARGET_DATE } from "@/constants/constants";

export type CounterTypes = {
  buttonTypes?: ButtonTypes;
};

export default function Counter({
  buttonTypes,
}: Readonly<CounterTypes>): React.JSX.Element {
  const [timeLeft, setTimeLeft] = useState<{
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    // 2. Función reutilizable para calcular el tiempo
    const calculateTime = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      return {
        months: Math.floor(d / 30),
        days: d % 30,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // 3. Ejecutamos inmediatamente la primera vez
    setTimeLeft(calculateTime());

    // 4. Seteamos el intervalo para las actualizaciones subsiguientes
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const getLabelFormated = (label: string, value: number): string => {
    if (label.includes("Mes")) return value === 1 ? "Mes" : "Meses";
    if (label.includes("Día")) return value === 1 ? "Día" : "Días";
    if (label.includes("Hora")) return value === 1 ? "Hora" : "Horas";
    if (label.includes("Minuto")) return value === 1 ? "Minuto" : "Minutos";
    if (label.includes("Segundo")) return value === 1 ? "Segundo" : "Segundos";
    return label;
  };

  return (
    <section className="py-6 px-2 md:py-16 bg-beige-100 text-center flex flex-col justify-center">
      <h2 className="text-3xl font-semibold mb-4">Falta muy poco...</h2>

      <div className="flex justify-center gap-2 md:gap-8">
        {timeLeft ? (
          [
            { label: "Meses", value: timeLeft.months },
            { label: "Días", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Minutos", value: timeLeft.minutes },
            { label: "Segundos", value: timeLeft.seconds },
          ]
            .filter((item) => item.value > 0 || item.label === "Segundos")
            .map((item) => (
              <div
                key={item.label}
                className="flex flex-col min-w-14 md:min-w-24"
              >
                <span className="text-3xl md:text-6xl font-bold text-stone-700 tabular-nums">
                  {item.value}
                </span>
                <span className="text-[10px] md:text-sm uppercase tracking-widest font-medium text-stone-500">
                  {getLabelFormated(item.label, item.value)}
                </span>
              </div>
            ))
        ) : (
          <div className="animate-pulse">
            <span className="text-2xl md:text-4xl font-light tracking-[0.2em] text-beige-500 uppercase">
              28 . 03 . 2026
            </span>
          </div>
        )}
      </div>
      <div className="hidden md:flex w-full items-center justify-center pt-10">
        <Button {...buttonTypes} variant="filled">
          {buttonTypes?.children ?? "Confirmar asistencia"}
        </Button>
      </div>
    </section>
  );
}
