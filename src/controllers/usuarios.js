const pool = require("../database");

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
    usuarios: usuarios
  });
}

const getUsuario = async (req, res) => {

  const {id} = req.body;

  console.log(' ID: ', id);

  const usuarios = await pool.query ('SELECT * FROM users WHERE id = ?', [id]);

  console.log(usuarios);

  res.json({
    ok: true,
    usuarios: usuarios
  });
}

const createUsuarios = async (req, res) => {

  const {username, password} = req.body;

  console.log(username);

  const exist = await validateUsuario(username);

  console.log("EXIST: ", exist);

  if(!exist) {
    const newUser = {
      username,
      password
    };
  
    await pool.query ('INSERT INTO users set ?', [newUser]);
  
    res.json({
      ok: true,
      msg: 'Creando Usuario'
    });
  } else {
    res.json({
      ok: false,
      msg: 'Usuario ya creado'
    });
  }

  
}

module.exports = {
  getAllUsuarios,
  createUsuarios,
  getUsuario
}