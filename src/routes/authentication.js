const express = require('express');

const {Router} = require('express');
const passport = require('passport');
const {home } = require('../controllers/authentication');

const pool = require('../database');

const router = Router();

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect : '/home',
  failureRedirect : '/signup',
  failureFlash: true
}));

router.get('/signin', (req, res)=>{
  res.json({
    ok: true,
    msg: 'signin'
  });
});

router.get('/home', (req, res) => {
  res.json({
    ok: true,
    msg: 'home'
  });
});


module.exports = router;