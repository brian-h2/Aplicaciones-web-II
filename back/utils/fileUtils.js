import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const leerJson = (archivo) => {
  const ruta = path.join(__dirname, '..', 'data', archivo);
  return JSON.parse(readFileSync(ruta, 'utf-8'));
};

export const escribirJson = (archivo, data) => {
  const ruta = path.join(__dirname, '..', 'data', archivo);
  writeFileSync(ruta, JSON.stringify(data, null, 2));
};

