const pool = require("../database");
const passport = require('passport');
const { response, json } = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const login = async (req, res = response) => {

  const { username, password } = req.body;

  try{

    const rows = await pool.query('select * from users where username = ?', [username]);

    const encryptedPassword = rows[0]['password'];

    if( rows.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: 'Email o contraseña incorrecta'
      });
    }

    const validPassword = bcrypt.compareSync(password, encryptedPassword);

    if(!validPassword) {
      return res.status(400).json({
        ok:false,
        msg: 'Contraseña no válida'
      })
    }

    const token = await generarJWT(rows[0]['username']);

    res.json({
      ok: true,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    });
  }
  
}

const home = async (req, res) => {
  console.log('HOME');
}

module.exports = {
  login
};

