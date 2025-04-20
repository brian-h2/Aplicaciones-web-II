import express from 'express';
import dotenv from 'dotenv';
import {readFile, writeFile} from 'fs/promises';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Estas dos líneas reemplazan __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Variables de entorno que buscar en la misma jerarquia que index

dotenv.config();

//Inicializamos express.
const app = express();
//Agregamos el paquete de json
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Lectura de los json.
const FileOrganizations = await readFile('./data/organizations.json');
const FileRecipes = await readFile('./data/recipes.json');
const FileShops = await readFile('./data/shops.json');

//Parseo de los json.
let organizationsData = JSON.parse(FileOrganizations);
let recipesData = JSON.parse(FileRecipes);
let shopsData = JSON.parse(FileShops);

//Accedemos a la lista de valores
let valuesOrganizations = organizationsData.Organizaciones;
let valuesRecipes = recipesData.Recetas;
let valuesShops = shopsData.Comercios;

const leerJson = (archivo) => { //Permite realizar la lectura del json para luego manipularlo en base a nuestras preferencias
    const ruta = path.join(__dirname, 'data', archivo);
    return JSON.parse(readFileSync(ruta, 'utf-8'))
}

const escribirJson = (archivo,data) => { //Permite escribir (Modificar) el json que requerimos
    const ruta = path.join(__dirname, 'data', archivo);
    writeFileSync(ruta, JSON.stringify(data, null, 2));
}

//Obtencion de las organizaciones activas.
app.get('/organizaciones/activas', (req, res) => {
    res.json(valuesOrganizations.filter(org => org.Activa));
});

app.get('/organizaciones', (req, res) => {
    res.json(valuesOrganizations);
});
  
// GET 2 - Comercios que ofrecen arroz
app.get('/comercios/producto/arroz', (req, res) => {
    res.json(valuesShops.filter(com => com.Productos.includes('Arroz')));
});
  
// POST 1 - Crear una nueva organizacion
app.post('/organizaciones', (req, res) => {
    const { Nombre, Ubicacion, Activa, Status, Id_Receta } = req.body;
    const recetaExiste = valuesRecipes.some(r => r.Id_Receta === Id_Receta);
    if (!recetaExiste) return res.status(400).json({ error: 'Receta no encontrada' });
  
    const nuevaOrg = {
      Id_Organizacion: valuesOrganizations.length + 1,
      Nombre,
      Ubicacion,
      Activa,
      Status,
      Id_Receta
    };
    valuesOrganizations.push(nuevaOrg);
    escribirJson('organizations.json', valuesOrganizations); //Pasamos el json mas los valores a actualizar
    res.status(201).json(nuevaOrg);
});
  
// POST 2 - Buscar recetas por ingrediente
app.post('/recetas/buscar', (req, res) => {
    const { ingrediente } = req.body;
    if (!ingrediente) return res.status(400).json({ error: 'Ingrediente requerido' });
  
    const encontradas = valuesRecipes.filter(r => r.Ingredientes.includes(ingrediente));
    res.json(encontradas);
});
  
// PUT - Actualizar instrucciones de una receta
app.put('/recetas/:id', (req, res) => {
    const { id } = req.params;
    const { Instrucciones } = req.body;

    const valuesRecipes = leerJSON('recipes.json');
    const receta = valuesRecipes.find(r => r.Id_Receta === parseInt(id));
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
  
    receta.Instrucciones = Instrucciones;
    escribirJson('recipes.json', valuesRecipes)
    res.json(receta);  
});
  
// DELETE - Eliminacion de una receta si no esta siendo usada por la organizacion.
app.delete('/recetas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const valuesRecipes = leerJson('recipes.json');
    const valuesOrganizations = leerJson('organizations.json');

    const enUso = valuesOrganizations.some(org => org.Id_Receta === id);
    if (enUso) return res.status(400).json({ error: 'La receta está en uso por una organización' });
  
    const nuevaLista = valuesRecipes.filter(r => r.Id_Receta !== id);
    if (nuevaLista.length === valuesRecipes.length) return res.status(404).json({ error: 'Receta no encontrada' });
  
    escribirJson('recipes.json', nuevaLista);
    res.json({ mensaje: 'Receta eliminada correctamente' });
});

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto', PORT)
})
