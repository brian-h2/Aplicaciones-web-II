import { useState } from "react";
import swal from 'sweetalert2';


export default function NewProductForm ({onClose, onProductoAgregado}) {

    //Creamos objeto con campos necesarios, este nuevo producto se va actualizando con el onchange
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        cantidad: '',
        categoria: '',
        fecha_vencimiento: '',
        comercioId: ''
    });
 
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{

           const camposVacios = Object.values(nuevoProducto).some(valor => valor.trim() === '');

            if (camposVacios) {
                swal.fire({
                    icon: 'error',
                    title: 'Debe completar todos los campos antes de guardar.'
                });
                return;
            }
            //La informacion de nuevo producto se envia al backend
            const res = await fetch('http://localhost:4000/productos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(nuevoProducto)
            })

            //Obtenemos respuesta del backend
            const data = await res.json();

            if(data.nroError != 0) {
                swal.fire({
                    icon: 'error',
                    title: 'Error al agregar producto',
                    text: data.error
                });
                setNuevoProducto({
                    nombre: '',
                    cantidad: '',
                    categoria: '',
                    fecha_vencimiento: '',
                    comercioId: ''
                })                
            } else {
                //Se llama a esta funcion permitiendo que el padre agregue el producto sin recargar la pagina
                onProductoAgregado(data);

                onClose(); //Cerramos formulario
                Swal.fire({
                    title: "Producto registrado",
                    text: "Su producto fue agregado exitosamente a la lista disponible.",
                    icon: "success"
                });

                //Limpia los valores
                setNuevoProducto({
                    nombre: '',
                    cantidad: '',
                    categoria: '',
                    fecha_vencimiento: '',
                    comercioId: ''
                })
            }

        } catch (error) {
            console.error('Error al agregar un producto', error);
        }

    }

    //Formulario

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Nuevo producto</h3>
                <form onSubmit={handleSubmit}>

                    <input
                        className="mb-2 w-full border px-3 py-2 rounded"
                        placeholder="Nombre"
                        value={nuevoProducto.nombre}
                        onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                        required
                    />
                    <input
                        className="mb-2 w-full border px-3 py-2 rounded"
                        placeholder="Cantidad"
                        type="number"
                        value={nuevoProducto.cantidad}
                        onChange={e => setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) })}
                        required
                    />
                    <input
                        className="mb-2 w-full border px-3 py-2 rounded"
                        placeholder="Categoría"
                        value={nuevoProducto.categoria}
                        onChange={e => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
                        required
                    />
                    <input
                        className="mb-2 w-full border px-3 py-2 rounded"
                        placeholder="Fecha de vencimiento"
                        type="date"
                        value={nuevoProducto.fecha_vencimiento}
                        onChange={e => setNuevoProducto({ ...nuevoProducto, fecha_vencimiento: e.target.value })}
                        required
                    />
                    <input
                        className="mb-4 w-full border px-3 py-2 rounded"
                        placeholder="ID del comercio"
                        type="number"
                        value={nuevoProducto.comercioId}
                        onChange={e => setNuevoProducto({ ...nuevoProducto, comercioId: parseInt(e.target.value) })}
                        required
                    />
                </form>

                <div className="flex justify-end space-x-2">
                    <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleSubmit}>Guardar</button>
                </div>
            </div>
        </div>
    )


}