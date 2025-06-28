import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from '../back/routes/apiRoutes.js';

//Variables de entorno que buscar en la misma jerarquia que index

dotenv.config();

//Inicializamos express.
const app = express();
//Agregamos el paquete de json
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use('/', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto', PORT)
})
