require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/cofig');

//Servidor express
const app = express();

//CORS
app.use(cors());

//DB

//Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola Mundo'
  });
});

app.listen(process.env.PORT, ()=>{
  console.log('Servidor corriendo en puerto ' + process.env.PORT)
});