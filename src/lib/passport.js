const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback : true
}, async (req, username, password, done) => {

  const rows = await pool.query('select * from users where username = ?', [username]);
  
  if(rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);

    if(validPassword) {
      done(null, user, req.flash('success','Bienvenido a No Pain No Gain ' + user.username));
    } else {
      done(null, false, req.flash('message','Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message','Usuario no registrado'));
  }

}));

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
  const rows = await pool.query('select * from users where username = ?', [username]);

  console.log( "EXIST " + rows.length)

  if( rows == 0) {
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
  }

  return done(null, false, req.flash('Usuario ya creado'));

}));

passport.serializeUser((usr, done)=> {
  done(null, usr.id);
});

passport.deserializeUser(async (id, done)=>{
  const rows = await pool.query('SELECT * FROM users where id = ?', [id]);
  done(null, rows[0]);
});