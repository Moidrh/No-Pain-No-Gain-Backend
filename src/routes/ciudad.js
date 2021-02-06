const express = require('express');

const {Router} = require('express');

const {isLoggedIn} =require('../lib/auth');

const {getAllCiudades, createCiudades} = require('../controllers/ciudad');

const pool = require('../database');

const router = Router();

router.get('/search', isLoggedIn, getAllCiudades);

router.post('/add', isLoggedIn, createCiudades);

module.exports = router;