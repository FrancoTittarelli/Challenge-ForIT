const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- BASE DE DATOS (Array en memoria) ---
let tasks = [
    {
        id: "1",
        title: "Primera tarea",
        description: "Esto viene del servidor",
        completed: false,
        createdAt: new Date()
    }
];

// --- RUTAS (ENDPOINTS) ---

// 1. GET: Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 2. POST: Crear una tarea nueva
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: String(Date.now()), // Usamos la fecha como ID único
        title: req.body.title,
        description: req.body.description || "",
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    res.json(newTask);
});

// 3. PUT: Editar una tarea (por ID)
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    // Buscamos la posición en el array (como un find en C++)
    const index = tasks.findIndex(t => t.id === id);

    if (index !== -1) {
        // Actualizamos solo los campos que nos manden
        tasks[index] = { ...tasks[index], ...req.body };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

// 4. DELETE: Borrar una tarea (por ID)
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    // Filtramos el array: nos quedamos con todas MENOS la que tiene ese ID
    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: "Tarea eliminada correctamente" });
});

// --- ARRANCAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Backend corriendo full en: http://localhost:${PORT}/api/tasks`);
});