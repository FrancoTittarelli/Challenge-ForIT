import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // 1. Cargar tareas al iniciar (GET)
  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error cargando tareas:", error));
  }, []);

  // 2. Función para agregar tarea (POST)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask) return;

    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, description: "Creada desde el Front" })
    })
    .then(response => response.json())
    .then(data => {
      setTasks([...tasks, data]); // Agregamos la nueva tarea a la lista visual
      setNewTask(""); // Limpiamos el input
    });
  };

  // 3. Función para borrar tarea (DELETE)
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        // Quitamos la tarea borrada de la lista visual
        setTasks(tasks.filter(task => task.id !== id));
      });
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Mis Tareas (Challenge ForIT)</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Escribí una nueva tarea..." 
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Agregar Tarea
        </button>
      </form>

      {/* Lista de Tareas */}
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px', fontSize: '18px' }}>
            {task.title} 
            <button 
              onClick={() => handleDelete(task.id)} 
              style={{ marginLeft: '15px', color: 'red', cursor: 'pointer' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App