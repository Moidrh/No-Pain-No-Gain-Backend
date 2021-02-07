/**
 * Path: /api/authentication
 */

const express = require('express');

const {Router} = require('express');
const passport = require('passport');
const pool = require('../database');
const {isLoggedIn} =require('../lib/auth');

const { login } = require('../controllers/authentication');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');


const router = Router();

//FERNANDO HERRERA

router.post('/', [check('username', 'El email es obligatorio').isEmail(), 
check('password', 'El password es obligatorio').not().isEmail(), 
validarCampo], login)


// YOUTUBE

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect : '/api/authentication/signin',
  failureRedirect : '/api/authentication/signup',
  failureFlash: true
}));

router.get('/signup', (req, res) => {
  res.json({
    ok: false,
    msg: 'No es posible crear el usuario'
  });
});

router.post('/signin', (req, res, next)=>{
  passport.authenticate('local.signin', {
    successRedirect: '/api/home',
    failureRedirect: '/api/home',
    failureFlash: true
  })(req, res, next);
});

router.get('/signin', (req, res) => {
  console.log('SignIN')

  res.json({
    ok: true,
    msg: '/login'
  });
});

router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect('/api/authentication/signin');
});


module.exports = router;