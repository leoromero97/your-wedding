import type { LocationSectionTypes } from "@/components/sections/Location";
import dressCodeImg from "@/assets/dresscode-transparent.png";

export const HERO_IMAGE_URL = "/hero-mili-nico.jpg";

export const TARGET_DATE = new Date("2026-03-28T00:00:00");

export const LOCATION_PARTY: LocationSectionTypes = {
  title: "Plaisir Eventos",
  type: "Salón",
  address: "Zuviría 4915, C1439 Cdad. Autónoma de Buenos Aires",
  startHour: "21 hs",
  addressUrl: "https://maps.app.goo.gl/Kj5EEhjo9xiag9fZ8",
  iframeSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.6741820938914!2d-58.48183132425719!3d-34.66293047293311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9699e005f77%3A0x1cb3904c304be416!2sSal%C3%B3n%20Plaisir!5e0!3m2!1ses-419!2sar!4v1769722979163!5m2!1ses-419!2sar",
};

export const LOCATION_CHURCH: LocationSectionTypes = {
  title: "Capilla Lorenzo Massa",
  type: "Iglesia",
  address:
    "Avenida General Fernández de la Cruz 2145, C1437 Cdad. Autónoma de Buenos Aires",
  startHour: "18 hs",
  addressUrl: "https://maps.app.goo.gl/iJQYjAfUDcnFfs4YA",
  iframeSrc:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3282.022959295948!2d-58.4389654!3d-34.6541231!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbc078ace2eb%3A0x458218af4657bdf0!2sCiudad%20Deportiva%20-%20Club%20Atl%C3%A9tico%20San%20Lorenzo%20de%20Almagro!5e0!3m2!1ses-419!2sar!4v1769721942206!5m2!1ses-419!2sar",
};

export const DRESS_CODE = {
  value: "Elegante",
  image: dressCodeImg,
  invalidColors: ["Blanco", "Rojo", "Azul"],
  /* A confirmar el color del traje de Nico, por ahora dejo azul  */
};

export const BANK_DATA = {
  alias: "SUEÑOS.UALA.2026",
  bankName: "Ualá",
};

export const BANK_DATA_2 = {
  alias: "SUEÑOS.GALICIA.2026",
  bankName: "Banco Galicia - Cuenta Corriente",
};
/* 
Pendientes para la invitación digital:

2. agregar 2 datos bancarios reales
3. agregar book de fotos si se llega con los tiempos
*/
