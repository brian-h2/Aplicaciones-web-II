import { useEffect, useState } from 'react'
import { getProductos } from '../api/FetchClient.js'
import NewProductForm from './NewProductForm.jsx';
import TicketProduct from './TicketProduct.jsx';

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoria, categoriaSeleccionada] = useState('Todas');
  const [ticketProducto, setTicketProducto] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductos()
      .then(res => setProductos(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [])

  const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = productos.filter(p => {
    const coincideCategoria = categoria === 'Todas' || p.categoria === categoria;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Skeleton loader para tarjetas
  const SkeletonCard = () => (
    <div className="bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-2 animate-pulse">
      <div className="h-4 w-24 bg-blue-100 rounded mb-2" />
      <div className="h-6 w-3/4 bg-blue-200 rounded mb-1" />
      <div className="h-4 w-1/2 bg-blue-100 rounded mb-1" />
      <div className="h-4 w-1/3 bg-blue-100 rounded mb-1" />
      <div className="h-3 w-1/4 bg-blue-50 rounded" />
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        {/* Filtro por categoría */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label className="font-medium text-gray-700 mr-2">
            Categoría:
          </label>
          <select
            className="border border-blue-300 bg-blue-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={categoria}
            onChange={e => categoriaSeleccionada(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* Buscador */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
          <label className="font-medium text-gray-700 mr-2">
            Buscar:
          </label>
          <input
            type="text"
            className="border border-blue-300 bg-blue-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-64"
            placeholder="Nombre o categoría..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        {/* Botón agregar */}
        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition font-semibold"
        >
          + Agregar producto
        </button>
      </div>

      {/* Formulario modal */}
      {mostrarFormulario && (
        <NewProductForm
          onClose={() => setMostrarFormulario(false)}
          onProductoAgregado={(productoNuevo) => {
            setProductos(prev => [...prev, productoNuevo]);
            setTicketProducto(productoNuevo);
          }}
        />
      )}

      {/* Ticket producto */}
      {ticketProducto && (
        <TicketProduct
          producto={ticketProducto}
          onClose={() => setTicketProducto(null)}
        />
      )}

      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Productos disponibles <span className="text-blue-500">({productosFiltrados.length})</span>
      </h2>

      {/* Animación de carga */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productosFiltrados.map(p => (
            <div
              key={p.id}
              className="bg-white border border-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col gap-2 relative overflow-hidden animate-fade-in-up"
            >
              <div className="absolute top-0 right-0 m-2 px-3 py-1 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs rounded-full shadow">
                {p.categoria}
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-1">{p.nombre}</h3>
              <p className="text-sm font-semibold text-red-500 mb-1">
                Vence: <span className="font-normal">{p.fecha_vencimiento}</span>
              </p>
              <p className="text-sm text-gray-700 mb-1">
                Cantidad: <span className="font-semibold">{p.cantidad}</span>
              </p>
              <div className="mt-auto flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-xs text-gray-500">Disponible</span>
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