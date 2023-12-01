const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const alunoController = require('./src/controllers/alunoController');

// rotas da home
route.get('/', homeController.index);

// rota para exibir o form
route.get('/adicionarAluno', alunoController.renderForm);

// rota para processar a adição de um novo aluno
route.post('/adicionarAluno', alunoController.adicionarAluno);

module.exports = route;
