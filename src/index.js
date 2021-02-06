require('dotenv').config();


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const {dbConnection} = require('./database/cofig');

//Servidor express
const app = express();
require('./lib/passport');

//CORS
app.use(cors());

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/usuarios', require('../src/routes/usuario'));
app.use('/api/authentication', require('../src/routes/authentication'));
app.use('/api/ciudad', require('../src/routes/ciudad'));
app.use('/api/sede', require('../src/routes/sede'));




app.listen(process.env.PORT, ()=>{
  console.log('Servidor corriendo en puerto ' + process.env.PORT)
});