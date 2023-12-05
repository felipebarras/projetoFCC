const Aluno = require('../models/AlunoModel');

exports.index = async (req, res) => {
  try {
    // verifica se o addedMember está na query
    const added = req.query.addedMember === 'true';

    // busca os alunos
    const alunos = await Aluno.find();

    // renderiza o site, passando a flag added e a lista de alunos
    res.render('index', { alunos, added });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao buscar alunos!');
  }
};

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json({ alunos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar os alunos' });
  }
};
