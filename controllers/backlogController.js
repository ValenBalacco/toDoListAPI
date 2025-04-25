const Backlog = require('../models/Backlog');
const Task = require('../models/Task');

exports.getBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findOne().populate('tareas');
    if (!backlog) return res.status(404).json({ message: 'Backlog no encontrado' });
    res.json(backlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBacklog = async (req, res) => {
  try {
    const exists = await Backlog.findOne();
    if (exists) return res.status(400).json({ message: 'Ya existe un backlog' });

    const backlog = new Backlog(req.body);
    await backlog.save();
    res.status(201).json(backlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addTaskToBacklog = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    const backlog = await Backlog.findOne();
    if (!backlog) return res.status(404).json({ message: 'Backlog no encontrado' });

    if (!backlog.tareas.includes(task._id)) {
      backlog.tareas.push(task._id);
      await backlog.save();
    }

    res.json(backlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
