import express from 'express';

import {
  getOrganizationsActive,
  getOrganizations,
  postOrganization
} from '../controllers/organizationsController.js';

import {
  productsList,
  creationProducts
} from '../controllers/productsController.js';

import {
  recipesAll,
  recipesSearch,
  refreshRecipes,
  deleteRecipe
} from '../controllers/recipesController.js';

import {
    register,
    loginUser
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/organizaciones/activas', getOrganizationsActive);
router.get('/organizaciones', getOrganizations);
router.post('/organizaciones', postOrganization);

router.get('/productos', productsList);
router.post('/productos', creationProducts);

router.get('/recetas', recipesAll);
router.post('/recetas/buscar', recipesSearch);
router.put('/recetas/:id', refreshRecipes);
router.delete('/recetas/:id', deleteRecipe);

router.post('/register', register);
router.post('/login', loginUser);

export default router;