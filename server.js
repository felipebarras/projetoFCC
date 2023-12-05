require('dotenv').config(); // carregando variáveis de ambiente do .env file

const express = require('express');
const app = express();
const mongoose = require('mongoose');

console.log(process.env.CONNECTIONSTRING);

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.emit('emitido');
  })
  .catch((error) => console.log(`Erro ao conectar no MongoDB: ${error}`));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const { middlewareGlobal } = require('./src/middlewares/middleware');

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

app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(routes);

app.on('emitido', () => {
  app.listen(3000, () => {
    console.log(`Acessar http://localhost:3000`);
  });
});
