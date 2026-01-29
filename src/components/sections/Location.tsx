import React from "react";
import { MapSection } from "../MapSection";
import { MapPin } from "lucide-react";
import {  } from "@/constants/constants";

export type LocationSectionTypes = {
  title: string;
  type?: string;
  address: string;
  addressUrl: string;
  startHour: string;
  lat: number;
  lon: number;
  description?: string;
};

export default function Location({
  address,
  addressUrl,
  lat,
  lon,
  startHour,
  title,
  description,
  type
}: Readonly<LocationSectionTypes>): React.JSX.Element {
  return (
    <section className="py-16 grid md:grid-cols-2 container mx-auto px-6 gap-12 border-b">
      <div>
        <h2 className="text-3xl font-bold mb-6 italic text-beige-900">
          ¿Dónde?
        </h2>
        <div className="flex gap-2 items-center mb-2 ">
          <MapPin className="text-beige-700 w-5 h-5" />
          <p className="text-lg font-semibold text-beige-800">Ubicación:</p>
        </div>
        <p className="mb-4 text-beige-700">{address}</p>
        <a
          href={addressUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          Ver en Google Maps
        </a>

        <div className="mt-8 flex gap-8">
          <div>
            <p className="font-semibold italic text-beige-900">Entrada</p>
            <p className="text-beige-700">{startHour}</p>
          </div>
        </div>
      </div>
      <div className=" rounded-lg overflow-hidden border border-beige-200 shadow-sm overflow-y-hidden">
        <MapSection
          address={address}
          lat={lat}
          lon={lon}
        />
      </div>
    </section>
  );
}
