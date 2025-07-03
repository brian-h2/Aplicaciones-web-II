# 📚 Aplicaciones Web II

## 📖 About

Este repositorio fue creado con el fin de subir los archivos desarrollados durante las clases de la materia **Aplicaciones Web II**. Al finalizar la cursada, contendrá un proyecto web completo utilizando tecnologías como Node.js, Express, manejo de archivos JSON y rutas RESTful.

---

## 🚀 Tecnologías Utilizadas

- Node.js
- Express.js
- JavaScript moderno (ESModules)
- JSON para persistencia de datos
- dotenv
- fs/promises y fs

---

## 📂 Estructura del Proyecto

```
aplicaciones-web-ii/
│
├── data/
│   ├── organizations.json     → Datos de las organizaciones
│   ├── recipes.json           → Recetas disponibles
│   └── shops.json             → Comercios y productos
│
├── index.js                   → Servidor principal con rutas y lógica de API
├── .env                       → Variables de entorno (ej: PORT)
├── package.json               → Dependencias y scripts del proyecto
└── README.md                  → Este archivo
```

---

## ⚙️ Cómo ejecutar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/aplicaciones-web-ii.git
   cd aplicaciones-web-ii
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Crear el archivo `.env` (si no existe):**
   ```
   PORT=3000
   ```

4. **Ejecutar el servidor:**
   ```bash
   node index.js
   ```

---

## 📌 Endpoints Implementados

### 🔍 Buscar recetas por ingrediente  
**POST `/recetas/buscar`**

**Body de ejemplo:**
```json
{
   "Ingrediente": ["Pasta"]
}
```

🔎 Busca todas las recetas que contengan alguno de los ingredientes indicados.  
📌 Acepta un array de ingredientes (puede ser uno o más).

---

### ✏️ Actualizar instrucciones de una receta  
**PUT `/recetas/:id`**

**Ejemplo (ID = 4):**
```json
{
   "Instrucciones": [
      "Hervir pollo, luego sumar arroz y verduras a gusto."
   ]
}
```

🛠 Permite modificar las instrucciones de una receta existente según su ID.

---

### 🗑️ Eliminar una receta  
**DELETE `/recetas/:id`**

**Ejemplo de receta a eliminar (ID = 11):**
```json
{
    "Id_Receta": 11,
    "Ingredientes": [
      "Dos huevos",
      "Banana",
      "Avena"
    ],
    "Instrucciones": "Mezclar en un boul los tres ingredientes y luego ir llevando el contenido a un sartén hasta que tomen color dorado."
}
```

❗ La receta solo se puede eliminar si **no está en uso por ninguna organización**.

---

## ✅ Buenas Prácticas Usadas

- ✅ Lectura y escritura de JSON en **cada ruta** para garantizar datos actualizados.
- ✅ Comparaciones cuidadosas (ej: ingredientes) sin distinción entre mayúsculas/minúsculas.
- ✅ Separación de funciones reutilizables: `leerJson`, `escribirJson`.
- ✅ Validaciones simples para evitar errores por datos faltantes o duplicados.

---

## 📅 Estado

Proyecto en desarrollo 🚧  
Se irá actualizando clase a clase hasta consolidar el proyecto final para la materia.

---
