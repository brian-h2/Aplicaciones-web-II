import { useEffect, useState } from 'react'
import { getProductos } from '../api/FetchClient.js'
import NewProductForm from './NewProductForm.jsx';

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoria, categoriaSeleccionada] = useState('Todas');

  useEffect(() => {
    getProductos().then(res => setProductos(res.data)).catch(console.error)
  }, []) //Recibimos el json desde el getproductos

  //Toma categorias unicas
  const categorias = ['Todas',...new Set(productos.map(p => p.categoria))]

  //Filtra productos segun la categoria
  const productosFiltrados =
  categoria === 'Todas'
    ? productos
    : productos.filter(p => p.categoria === categoria)

  return (
    <section>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">
          Filtrar por categoría:
        </label>
        <select
          className="border rounded-md px-4 py-2"
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

      {/*Boton agregar*/}

      <button onClick={() => setMostrarFormulario(true)} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Agregar producto</button>
      
      {/* Formulario modal */}

      {mostrarFormulario && (
        <NewProductForm onClose={() => setMostrarFormulario(false)} onProductoAgregado={(productoNuevo) => setProductos(prev => [...prev, productoNuevo])}></NewProductForm>
      )}
      

      <h2 className="text-2xl font-bold mb-4">Productos disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productosFiltrados.map(p => (
          <div key={p.id} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{p.nombre}</h3>
            <p className="text-sm font-semibold text-red-600">Vence: {p.fecha_vencimiento}</p>
            <p className="text-sm text-gray">Cantidad: {p.cantidad}</p>
            <p className="text-sm text-gray">Categoria: {p.categoria}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
