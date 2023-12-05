exports.middlewareGlobal = (req, res, next) => {
  res.locals.localVariable = 'Este é o valor da variável local';
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }

  next();
};
