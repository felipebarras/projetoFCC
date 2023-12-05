const Aluno = require('../models/AlunoModel');

exports.renderForm = (req, res) => {
  res.render('novoAluno');
};

exports.adicionarAluno = async (req, res) => {
  // adicionar um novo aluno ao banco de dados
  // use dados do form presentes em req.body
  try {
    console.log(`Nome do aluno: ${req.body.name}`);
    console.log(`Email do aluno: ${req.body.email}`);

    const novoAluno = new Aluno({ name: req.body.name, email: req.body.email });

    await novoAluno.save();
    res.redirect('../?addedMember=true'); // redireciona para a home
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar aluno!');
  }
};
