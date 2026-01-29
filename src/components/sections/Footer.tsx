import React from "react";
import Button, { type ButtonTypes } from "../Button";

export type FooterTypes = {
  buttonTypes?: ButtonTypes;
  message: string;
};

export default function Footer({
  buttonTypes,
  message,
}: Readonly<FooterTypes>): React.JSX.Element {
  return (
    <footer className="py-12 md:py-16 px-4 text-center  gap-8 flex flex-col">
      <span className="italic text-lg text-beige-800">
        {message}
      </span>
      <div className="flex w-full items-center justify-center">
        <Button {...buttonTypes} variant="filled">
          Confirmar asistencia
        </Button>
      </div>

      <p className="text-xs text-beige-800">
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
  );
}
