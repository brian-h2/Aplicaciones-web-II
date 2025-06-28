import { leerJson, escribirJson } from "../utils/fileUtils.js";

export const getOrganizationsActive = (req, res) => {
    const organizationsData = leerJson('organizations.json');
    res.json(organizationsData.filter(org => org.Activa));
}

export const getOrganizations = (req, res) => {
    const organizationsAll = leerJson('organizations.json');
    res.json(organizationsAll);
}

export const postOrganization = (req, res) => {
    const { Nombre, Ubicacion, Activa, Status, Id_Receta } = req.body;
    const valuesRecipesData = leerJson('recipes.json');
    const organizationsData = leerJson('organizations.json');

    const recetaExiste = valuesRecipesData.some(r => r.Id_Receta === Id_Receta);
    if (!recetaExiste) return res.status(400).json({ error: 'Receta no encontrada' });
  
    const nuevaOrg = {
      Id_Organizacion: organizationsData.length + 1,
      Nombre, Ubicacion, Activa, Status, Id_Receta
    };
    organizationsData.push(nuevaOrg);
    escribirJson('organizations.json', organizationsData); //Pasamos el json mas los valores a actualizar
    res.status(201).json(nuevaOrg);
}