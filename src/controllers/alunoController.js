exports.renderForm = (req, res) => {
  res.render('novoAluno');
};

exports.adicionarAluno = async (req, res) => {
  // adicionar um novo aluno ao banco de dados
  // use dados do form presentes em req.body
  try {
    const novoAluno = new Aluno({ nome: req.body.nome });

    await novoAluno.save();
    res.redirect('/'); // redireciona para a home
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar aluno!');
  }
};
