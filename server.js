require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => app.emit('emitido'))
  .catch((e) => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware
} = require('./src/middlewares/middleware');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['self'],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'code.jquery.com',
          'cdn.jsdelivr.net'
        ],
        connectSrc: ['self', 'http://localhost:3000']
      }
    }
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'a812yu3281u281u8j1a8j18qwj1ajqu8qu1()',
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING,
    dbName: 'cursojs01'
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.get('/teste/:idUsers?/:param?', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send(req.query.nome);
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(`O que você enviou foi: ${req.body.qualquercoisa}`);
});

app.get('/contato', (req, res) => {
  res.send('Obrigado por contatar!');
});

app.on('emitido', () => {
  app.listen(3000, () => {
    console.log(`Acessar http://localhost:3000`);
  });
});
