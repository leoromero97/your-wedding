import React, { type ReactNode } from "react";

type HeroPropTypes = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  imageUrl?: string;
};

export default function Hero({
  title,
  subtitle,
  children,
  imageUrl,
}: Readonly<HeroPropTypes>) {
  return (
    <div className="relative">
      {imageUrl && (
        <img src={imageUrl} alt="Hero" className="w-full h-96 object-cover" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          {title && <h1 className="text-4xl font-bold">{title}</h1>}
          {subtitle && <p className="text-xl mt-2">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
