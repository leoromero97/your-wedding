import React from "react";

export type LocationSectionTypes = {
  title: string;
  type?: string;
  address: string;
  addressUrl: string;
  startHour: string;
  iframeSrc?: string;
};

export default function Location({
  address,
  addressUrl,
  startHour,
  title,
  type,
  iframeSrc,
}: Readonly<LocationSectionTypes>): React.JSX.Element {
  const titleLocation = title.concat(" - ", type ?? "");
  return (
    <section className="py-16 grid md:grid-cols-2 container mx-auto px-6 gap-6 md:gap-12 border-b">
      <div className="gap-2 flex flex-col">
        <h3 className="text-3xl font-bold mb-6 italic text-beige-900">
          {titleLocation}
        </h3>
        <p className="text-beige-700">{`Horario de ingreso: ${startHour}`}</p>
        <p className="mb-2 text-beige-700">{address}</p>
        <a
          href={addressUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          Ver en Google Maps
        </a>
      </div>
      <div className="rounded-lg overflow-hidden border border-beige-200 shadow-sm overflow-y-hidden">
        <iframe
          title={titleLocation}
          src={iframeSrc}
          width="400"
          height="250"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>
      </div>
    </section>
  );
}
