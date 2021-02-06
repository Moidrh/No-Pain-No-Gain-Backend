const pool = require("../database");

const validateSede = async (name) => {

  const exist = await pool.query ('SELECT COUNT(*) FROM sede WHERE name = ?', [name]);

  console.log("Desde validateUser: ", name);

  console.log("VER EXIST: ", exist[0]['COUNT(*)']);

  if (exist[0]['COUNT(*)'] == 0) {
    return false;
  } else {
    console.error('Sede ya existe');
    return true;
  }
}

const getAllSedes = async (req, res) => {

  const sedes = await pool.query ('SELECT * FROM sede');

  console.log(sedes);

  res.json({
    ok: true,
    Sedes: sedes
  });
}

const getSede = async (req, res) => {

  const {id} = req.body;

  const sedes = await pool.query ('SELECT u.username FROM sede s inner join ciudad c on c.id = s.ciudad_id inner join users u on u.id = s.user_id where s.id = ?', [id]);

  console.log(sedes);

  res.json({
    ok: true,
    Sedes: sedes
  });
}

const createSede = async (req, res) => {

  const {name, user_id, ciudad_id} = req.body;

  console.log(name);

  const exist = await validateSede(name);

  console.log("EXIST: ", exist);

  if(!exist) {
    const newSede = {
      name,
      user_id,
      ciudad_id
    };
  
    await pool.query ('INSERT INTO sede set ?', [newSede]);
  
    res.json({
      ok: true,
      msg: 'Creando Sede'
    });
  } else {
    res.json({
      ok: false,
      msg: 'Sede ya creado'
    });
  }

  
}

module.exports = {
  getAllSedes,
  createSede,
  getSede
}