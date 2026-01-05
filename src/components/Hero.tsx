import React, { type ReactNode } from "react";

type HeroPropTypes = {
  title?: string;
  description?: string;
  subtitle?: string;
  children?: ReactNode;
  imageUrl?: string;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

export default function Hero({
  title,
  description,
  subtitle,
  children,
  imageUrl,
  imageProps
}: Readonly<HeroPropTypes>) {
  return (
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          {...imageProps}
          src={imageUrl}
          alt={imageProps?.alt ?? "Casamiento Mili y Nico"}
          className={"absolute inset-0 w-full h-full object-cover" + (imageProps?.className ? " " + imageProps.className : "")}
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
        <div className="relative z-10 text-center text-beige-100 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-widest">
            {title}
          </h1>
          <p className="text-xl md:text-2xl font-light italic mb-6">
            {description}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-widest">
            {subtitle}
          </h2>
          {children}
        </div>
      </header>
  );
}
