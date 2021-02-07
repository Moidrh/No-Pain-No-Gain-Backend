require('dotenv').config();


const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);

const {dbConnection} = require('./database/cofig');
const {database} = require('./keys');

//Servidor express
const app = express();

//CORS
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    optionsSuccessStatus: 200
  }));

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
app.use('/api/home', require('../src/routes/index'));




app.listen(process.env.PORT, ()=>{
  console.log('Servidor corriendo en puerto ' + process.env.PORT)
});