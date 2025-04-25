const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const taskRoutes = require('./routes/tasks');
const sprintRoutes = require('./routes/sprints');
const backlogRoutes = require('./routes/backlog');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/tasks', taskRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);

7
app.post('/tasks', (req, res) => {
  const { titulo, descripcion, estado, fechaLimite, color } = req.body;

  if (!titulo || !fechaLimite) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: titulo o fechaLimite' });
  }

7
  const newTask = new Task({ titulo, descripcion, estado, fechaLimite, color });
  newTask.save()
    .then(task => res.status(201).json(task))
    .catch(err => res.status(500).json({ error: 'Error al crear la tarea', details: err.message }));
});

7
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('❌ Error al conectar a MongoDB:', error.message);
});
