import { leerJson, escribirJson } from "../utils/fileUtils.js";

// Listado de productos
export const productsList = (req, res) => {
    const productosData = leerJson('products.json');
    res.json(productosData)
}

// Creacion de un producto
export const creationProducts = (req, res) => {
    const {nombre, cantidad, categoria, fecha_vencimiento, comercioId} = req.body;
    const valuesProductsData = leerJson('products.json');

    const productoExiste = valuesProductsData.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    if(productoExiste) return res.status(400).json({ nroError: 1, error: 'Producto existente'})

    const nuevoProducto = {
        id: valuesProductsData.length + 1,
        nombre: nombre,
        cantidad: cantidad,
        categoria: categoria,
        fecha_vencimiento: fecha_vencimiento,
        comercioId: valuesProductsData.length + 1
    }

    valuesProductsData.push(nuevoProducto);
    escribirJson('products.json', valuesProductsData);
    res.status(201).json({nroError: 0, nuevoProducto})
}