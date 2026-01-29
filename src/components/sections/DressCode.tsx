import React from "react";

export type DressCodeTypes = {
  dressImage: string;
  title: string;
  dressCodeValue: string;
  invalidColors: string[];
};

export default function DressCode({
  dressCodeValue,
  dressImage,
  title,
  invalidColors,
}: Readonly<DressCodeTypes>): React.JSX.Element {
  const COLOR_DICTIONARY: Record<string, string> = {
    Blanco: "bg-white-100",
    Rojo: "bg-red-100",
    Azul: "bg-blue-100",
  };
  return (
    <section className="bg-beige-100 py-16 grid md:grid-cols-2 container mx-auto px-6 gap-6 md:gap-12">
      <div className="gap-2 flex flex-col">
        <img src={dressImage} alt="" />
        <h3 className="text-2xl font-bold mb-4 text-beige-900">
          {title.concat(" - ", dressCodeValue)}
        </h3>
        <ul className="text-beige-700 italic text-lg">
          <li>- Traje</li>
          <li>- Vestido</li>
          <li>- Tacos</li>
          <li>- Zapatos</li>
        </ul>
      </div>
      <div className="gap-4 flex flex-col">
        <h4 className="text-2xl font-bold mb-4 text-beige-900">Nos reservamos los colores</h4>
        <div className="grid grid-cols-3 gap-2 items-center justify-center">
          {invalidColors?.map((color) => (
            <div key={color} className="flex flex-col items-center">
              <div
                className={`rounded-full h-6 w-6 ${COLOR_DICTIONARY[color]} border border-beige-900`}
              />
              <span>{color}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
