import { leerJson, escribirJson } from "../utils/fileUtils.js";

export const recipesAll = () => {
    const recipes = leerJson('recetas.json');
    res.json(recipes);
}

// Buscar receta por ingrediente
export const recipesSearch = (req, res) => {
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
}

// Actualizamos las instrucciones de una receta
export const refreshRecipes = (req, res) => {
    const { id } = req.params;
    const { Instrucciones } = req.body;

    const valuesRecipesData = leerJson('recipes.json');
    const receta = valuesRecipesData.find(r => r.Id_Receta === parseInt(id));
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
  
    receta.Instrucciones = Instrucciones;
    escribirJson('recipes.json', valuesRecipesData);

    res.json(receta);  
}

// Eliminacion de receta
export const deleteRecipe = (req, res) => {
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
}