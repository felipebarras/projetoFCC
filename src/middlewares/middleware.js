exports.middlewareGlobal = (req, res, next) => {
  res.locals.localVariable = 'Este é o valor da variável local';
  next();
};
