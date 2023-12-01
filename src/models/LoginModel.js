const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
});

class Login {}

const LoginModel = mongoose.model('Login', LoginSchema);
