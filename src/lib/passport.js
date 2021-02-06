const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new Strategy({
  
}))

passport.use('local.signup', new Strategy({
  usernamefield: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  
  const newUser = {
    username,
    password
  };

  newUser.password = await helpers.encryptPassword(password);
  // VALIDAR SI EL USUARIO EXISTE
  const exist = await pool.query('select count(*) from users where username = ?', [username]);

  if( exist[0]['COUNT(*)'] == 0) {
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
  }

  return ('Usuario ya existente');

}));

passport.serializeUser((usr, done)=> {
  done(null, usr.id);
});

passport.deserializeUser(async (id, done)=>{
  const rows = await pool.query('SELECT * FROM users where id = ?', [id]);
  done(null, rows[0]);
});