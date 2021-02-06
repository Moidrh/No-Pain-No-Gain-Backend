const express = require('express');

const {Router} = require('express');
const passport = require('passport');
const pool = require('../database');
const {isLoggedIn} =require('../lib/auth');

const { home } = require('../controllers/authentication');


const router = Router();

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect : '/home',
  failureRedirect : '/signup',
  failureFlash: true
}));

router.get('/signup', (req, res) => {
  console.log(object)
});

router.post('/signin', (req, res, next)=>{
  // req.check('username', 'Username es requerido').notEmpty();
  // req.check('password', 'Contraseña es requerido').notEmpty();
  passport.authenticate('local.signin', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/signin', (req, res) => {
  console.log('object')
});

router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect('/signin');
});


module.exports = router;