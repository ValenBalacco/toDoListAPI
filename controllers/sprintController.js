const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

exports.getAllSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate('tareas');
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate('tareas');
    if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSprint = async (req, res) => {
  try {
    const sprint = new Sprint(req.body);
    await sprint.save();
    res.status(201).json(sprint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
    res.json(sprint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSprint = async (req, res) => {
  try {
    const deleted = await Sprint.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Sprint no encontrado' });
    res.json({ message: 'Sprint eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTaskToSprint = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    const sprint = await Sprint.findById(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });

    if (!sprint.tareas.includes(task._id)) {
      sprint.tareas.push(task._id);
      await sprint.save();
    }

    res.json(sprint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
