const jwt = require('jsonwebtoken');


const generarJWT = (username) => {

  return new Promise((resolve, reject)=>{

    const payload = {
      username
    }
  
    jwt.sign( payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    }, (err, token) => {
      if(err) {
        console.log(err);
        reject('No se pudo generar el JWT');
      } else {
        resolve(token);
      }
    });

  });

};

module.exports = {
  generarJWT
}