import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// --- ARREGLO PARA EL ICONO (Leaflet tiene un bug con Vite donde no encuentra los iconos por defecto) ---
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const LOCATION = {
    lat: -34.687158,
    lng: -58.4729835,
    address: "Itaquí 6300, C1436GNO Cdad. Autónoma de Buenos Aires",
    url: 'https://maps.app.goo.gl/D7M5LzaFRuBvtCS8A'
}

const POSITION: [number, number] = [LOCATION.lat, LOCATION.lng]; // Coordenadas de Castañon 3294

export const MapSection = () => {
  return (
    <div className="h-64 w-full rounded-lg overflow-hidden shadow-inner border border-stone-200">
      <MapContainer 
        center={POSITION} 
        zoom={15} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={POSITION}>
          <Popup>
            {LOCATION.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};