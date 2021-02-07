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

const getAllSedes = async (req, res) => {

  const sedes = await pool.query ('SELECT * FROM sede');

  console.log(sedes);

  res.json({
    ok: true,
    resultados: sedes
  });
}

const getUserBySede = async (req, res) => {

  const name = req.params.sede;

  const usernames = await pool.query ('SELECT u.username FROM users u inner join ciudad c on c.id = u.ciudad_id inner join sede s on s.id = u.sede_id where s.name = ?', [name]);

  console.log(usernames);

  res.json({
    ok: true,
    resultados: usernames
  });
}

const getSedeByCiudad = async (req, res) => {

  const name = req.params.ciudad;

  const usernames = await pool.query ('select s.* from sede s inner join ciudad c on c.sede_id = s.id where c.name = ?', [name]);

  console.log(usernames);

  res.json({
    ok: true,
    resultados: usernames
  });
}



const createSede = async (req, res) => {

  const {name, ciudad} = req.body;

  console.log(name);

  const exist = await validateSede(name);

  console.log("EXIST: ", exist);

  if(!exist) {
    const newSede = {
      name
    };
  
    await pool.query ('INSERT INTO sede set ?', [newSede]);
  
    res.json({
      ok: true,
      msg: 'Sede creada'
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
  getUserBySede,
  getSedeByCiudad
}