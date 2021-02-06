const pool = require("../database");

const validateCiudad = async (name) => {

  const exist = await pool.query ('SELECT COUNT(*) FROM ciudad WHERE name = ?', [name]);

  console.log("Desde validateUser: ", name);

  console.log("VER EXIST: ", exist[0]['COUNT(*)']);

  if (exist[0]['COUNT(*)'] == 0) {
    return false;
  } else {
    console.error('Ciudad ya existe');
    return true;
  }
}

const getAllCiudades = async (req, res) => {

  const ciudades = await pool.query ('SELECT * FROM ciudad');

  console.log(ciudades);

  res.json({
    ok: true,
    Ciudades: ciudades
  });
}

const createCiudades = async (req, res) => {

  const {name, user_id} = req.body;

  console.log(name);

  const exist = await validateCiudad(name);

  console.log("EXIST: ", exist);

  if(!exist) {
    const newCiudad = {
      name,
      user_id    
    };
  
    await pool.query ('INSERT INTO ciudad set ?', [newCiudad]);
  
    res.json({
      ok: true,
      msg: 'Creando Ciudad'
    });
  } else {
    res.json({
      ok: false,
      msg: 'Ciudad ya creado'
    });
  }

  
}

module.exports = {
  getAllCiudades,
  createCiudades
}