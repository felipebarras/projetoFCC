const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Aluno = mongoose.mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
