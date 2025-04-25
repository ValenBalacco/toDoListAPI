const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
  fechaInicio: { type: Date, required: true },
  fechaCierre: { type: Date, required: true },
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  color: { type: String }
});

module.exports = mongoose.model('Sprint', SprintSchema);
