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
    const organizationsData = leerJson('organizations.json');
    res.json(organizationsData.filter(org => org.Activa));
});

app.get('/organizaciones', (req, res) => {
    const organizationsData = leerJson('organizations.json');
    res.json(organizationsData);
});
  
// GET 2 - Comercios que ofrecen arroz
app.get('/comercios/producto/arroz', (req, res) => {
    const data = leerJson('shops.json');
    const valuesShopData = data.Comercios;
    res.json(valuesShopData.filter(com => com.Productos.includes('Arroz')));
});
  
// POST 1 - Crear una nueva organizacion
app.post('/organizaciones', (req, res) => {
    const { Nombre, Ubicacion, Activa, Status, Id_Receta } = req.body;
    const valuesRecipesData = leerJson('recipes.json');
    const organizationsData = leerJson('organizations.json');
    const recetaExiste = valuesRecipesData.some(r => r.Id_Receta === Id_Receta);
    if (!recetaExiste) return res.status(400).json({ error: 'Receta no encontrada' });
  
    const nuevaOrg = {
      Id_Organizacion: organizationsData.length + 1,
      Nombre,
      Ubicacion,
      Activa,
      Status,
      Id_Receta
    };
    organizationsData.push(nuevaOrg);
    escribirJson('organizations.json', organizationsData); //Pasamos el json mas los valores a actualizar
    res.status(201).json(nuevaOrg);
});
  
// POST 2 - Buscar recetas por ingrediente
app.post('/recetas/buscar', (req, res) => {
    const { Ingrediente } = req.body;

    const valuesRecipesData = leerJson('recipes.json');
    if (!Ingrediente) return res.status(400).json({ error: 'Ingrediente requerido' });
    const ingredientesBuscados = Ingrediente.map(i => i.trim().toLowerCase());

    const encontradas = valuesRecipesData.filter(r =>
      r.Ingredientes.some(i =>
        ingredientesBuscados.includes(i.trim().toLowerCase())
      )
    );
    res.json(encontradas);
});
  
// PUT - Actualizar unicamente INSTRUCCIONES de una receta
app.put('/recetas/:id', (req, res) => {
    const { id } = req.params;
    const { Instrucciones } = req.body;

    const valuesRecipesData = leerJson('recipes.json');
    const receta = valuesRecipesData.find(r => r.Id_Receta === parseInt(id));
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
  
    receta.Instrucciones = Instrucciones;
    escribirJson('recipes.json', valuesRecipesData);

    res.json(receta);  
});
  
// DELETE - Eliminacion de una receta si no esta siendo usada por la organizacion.
app.delete('/recetas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const valuesRecipes = leerJson('recipes.json');
    const valuesOrganizations = leerJson('organizations.json');

    const valuesOrganizationsData = valuesOrganizations;

    const enUso = valuesOrganizationsData.some(org => org.Id_Receta === id);
    if (enUso) return res.status(400).json({ error: 'La receta está en uso por una organización' });
  
    const nuevaLista = valuesRecipes.filter(r => r.Id_Receta !== id);
    if (nuevaLista.length === valuesRecipes.length) return res.status(404).json({ error: 'Receta no encontrada' });
  
    escribirJson('recipes.json', nuevaLista);
    res.json({ mensaje: 'Receta eliminada correctamente' });
});

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto', PORT)
})
