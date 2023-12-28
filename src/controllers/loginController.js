const Login = require('../../../agendaAlex/src/models/LoginModel');

exports.loginPage = (req, res) => {
  res.render('login');
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login/');
      });
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso');
    req.session.save(() => {
      return res.redirect('/login/');
    });
  } catch (err) {
    console.log(err);
    res.render('404');
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login');
      });
      return;
    }

    req.flash('success', 'Você entrou no sistema');
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect('/login');
    });
  } catch (err) {
    console.error(err);
    return res.render('404');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
