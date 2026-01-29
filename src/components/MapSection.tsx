import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// --- ARREGLO PARA EL ICONO (Leaflet tiene un bug con Vite donde no encuentra los iconos por defecto) ---
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export type MapType = {
  lat: number;
  lon: number;
  address: string;
};

export const MapSection = ({ address, lat, lon }: Readonly<MapType>) => {
  const POSITION: [number, number] = [lat, lon];

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden shadow-inner border border-stone-200 z-0 relative">
      <MapContainer
        center={POSITION}
        zoom={15}
        className="h-full w-full"
        scrollWheelZoom={false}
        touchZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={POSITION}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
