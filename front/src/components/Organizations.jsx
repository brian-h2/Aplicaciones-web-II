import { useEffect, useState } from 'react'
import { getOrganizaciones } from '../api/FetchClient.js';
import { MapPin } from 'lucide-react';

export default function Organizations() {
  const [orgs, setOrgs] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrganizaciones()
      .then(res => setOrgs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [])

  // Filtrar organizaciones por nombre o ubicación
  const orgsFiltradas = orgs.filter(org => {
    const coincideBusqueda = org.Nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      org.Ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideBusqueda;
  });

  // Skeleton loader para organizaciones
  const SkeletonCard = () => (
    <div className="bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-3 animate-pulse">
      <div className="h-5 w-2/3 bg-blue-100 rounded mb-3" />
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 bg-blue-200 rounded-full" />
        <div className="h-4 w-1/3 bg-blue-100 rounded" />
      </div>
      <div className="h-3 w-1/2 bg-blue-50 rounded" />
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        {/* Buscador */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
          <label className="font-medium text-gray-700 mr-2">
            Buscar:
          </label>
          <input
            type="text"
            className="border border-blue-300 bg-blue-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-64"
            placeholder="Nombre o ubicación..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Organizaciones <span className="text-blue-500">({orgsFiltradas.length})</span>
      </h2>

      {/* Animación de carga */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : orgsFiltradas.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No se encontraron organizaciones que coincidan con tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {orgsFiltradas.map(org => (
            <div
              key={org.Id_Organizacion}
              className="bg-white border border-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col gap-3 relative overflow-hidden animate-fade-in-up"
            >
              <div className="absolute top-0 right-0 m-2 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs rounded-full shadow">
                Activa
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">{org.Nombre}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                <span>{org.Ubicacion}</span>
              </div>
              <div className="mt-auto flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-xs text-gray-500">Disponible para recibir donaciones</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animación de fade-in para las cards */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out;
        }
      `}</style>
    </section>
  )
}