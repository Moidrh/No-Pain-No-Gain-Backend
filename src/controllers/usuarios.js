const pool = require("../database");
const {response} = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const validateUsuario = async (username) => {

  const exist = await pool.query ('SELECT COUNT(*) FROM users WHERE username = ?', [username]);

  console.log("Desde validateUser: ", username);

  console.log("VER EXIST: ", exist);

  if (exist[0]['COUNT(*)'] == 0) {
    return false;
  } else {
    console.error('Usuario ya existe');
    return true;
  }
}

const getAllUsuarios = async (req, res) => {

  const usuarios = await pool.query ('SELECT * FROM users');

  console.log(usuarios);

  res.json({
    ok: true,
    resultados: usuarios
  });
}

const getUsuario = async (req, res) => {

  const username = req.params.username;

  console.log(' ID: ', username);

  const usuarios = await pool.query ('SELECT * FROM users WHERE username = ?', [username]);

  console.log(usuarios);

  res.json({
    ok: true,
    resultados: usuarios,
  });
}

const createUsuarios = async (req, res = response) => {

  const {username, password, nameSede, nameCiudad} = req.body;

  console.log(username);
  
  try {
    const exist = await validateUsuario(username);

    const idSedeAux = await pool.query('select id from sede where name = ?', [nameSede])
      
    console.log('idSEDEAUX ', idSedeAux);

    const idCiudadAux = await pool.query('select id from ciudad where name = ?', [nameCiudad]);

    console.log('IDCIUDADAUX ', idCiudadAux);

    const idSede = idSedeAux[0]['id'];

    const idCiudad = idCiudadAux[0]['id'];
  
    if(!exist && idSede != null && idCiudad != null) {

      const newUser = {
        username,
        password,
        privilege: 'NORMAL',
        sede_id: idSede,
        ciudad_id: idCiudad
      };
    
      const salt = bcrypt.genSaltSync();

      newUser.password = bcrypt.hashSync(password, salt);

      await pool.query ('INSERT INTO users set ?', [newUser]);

      const token = await generarJWT(username);
    
      res.json({
        ok: true,
        usuario: newUser,
        token
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
  
}

const createUsuariosAdmin = async (req, res = response) => {

  const {username, password} = req.body;

  console.log(username);
  
  try {
    const exist = await validateUsuario(username);
  
    if(!exist) {

      const newUser = {
        username,
        password,
        privilege: 'ADMIN'
      };
    
      const salt = bcrypt.genSaltSync();

      newUser.password = bcrypt.hashSync(password, salt);

      await pool.query ('INSERT INTO users set ?', [newUser]);

      const token = await generarJWT(username);
    
      res.json({
        ok: true,
        usuario: newUser,
        token
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
  
}

module.exports = {
  getAllUsuarios,
  createUsuariosAdmin,
  createUsuarios,
  getUsuario
}