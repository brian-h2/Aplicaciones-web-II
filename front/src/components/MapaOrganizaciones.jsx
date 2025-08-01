import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Icono custom para los marcadores
const icon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapaOrganizaciones({ organizaciones }) {
  return (
    <div className="w-full h-[350px] rounded-2xl overflow-hidden shadow-lg mt-10">
      <MapContainer
        center={[-34.6037, -58.3816]} // Centro en CABA
        zoom={12}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {organizaciones.map(org => (
          <Marker key={org.Id_Organizacion} position={[org.latitud, org.longitud]} icon={icon}>
            <Popup>
              <strong>{org.Nombre}</strong><br />
              {org.Ubicacion}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}