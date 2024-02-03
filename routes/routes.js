const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Sesión
app.use(session({
  secret: 'secretito',
  resave: false,
  saveUninitialized: true
//   cookies
}));

//Middleware solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

//Middleware errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ha ocurrido un fallo en el servidor');
});

//Rutes
app.use('/', routes);

app.listen(3000, () => {
  console.log(`Servidor en ejecución en http://localhost:3000`);
});