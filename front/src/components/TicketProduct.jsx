export default function ({producto, onClose}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Producto Agregado</h2>
                <div className="space-y-2">
                    <p><strong>Nombre:</strong> {producto.nombre}</p>
                    <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                    <p><strong>Categoría:</strong> {producto.categoria}</p>
                    <p><strong>Vence el:</strong> {producto.fecha_vencimiento}</p>
                    <p><strong>ID Comercio:</strong> {producto.comercioId}</p>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )

}