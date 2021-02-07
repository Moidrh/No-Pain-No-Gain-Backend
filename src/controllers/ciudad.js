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

  // console.log(ciudades);

  res.json({
    ok: true,
    resultados: ciudades
  });
}

const getUsuariosByCiudad = async (req, res) => {

  const name = req.params.ciudad;

  const usernames = await pool.query ('select u.* from users u inner join ciudad c on c.id = u.ciudad_id where c.name = ?;  ', [name]);

  console.log(usernames);

  res.json({
    ok: true,
    resultados: usernames
  });
}

const createCiudades = async (req, res) => {

  const {nameCiudad, nameSede} = req.body;

  // console.log(name);

  const exist = await validateCiudad(nameCiudad);

  console.log("EXIST: ", exist);

  if(!exist) {

    const idSedeAux = await pool.query('select id from sede where name = ?', [nameSede]);

    const idSede = idSedeAux[0]['id'];

    console.log('ID SEDE: ', idSede)

    const newCiudad = {
      name: nameCiudad,
      sede_id: idSede    
    };
  
    await pool.query ('INSERT INTO ciudad set ?', [newCiudad]);
  
    res.json({
      ok: true,
      msg: newCiudad
    });
  } else {
    res.json({
      ok: false,
      msg: 'Ciudad ya creada'
    });
  }

  
}

module.exports = {
  getAllCiudades,
  createCiudades,
  getUsuariosByCiudad
}