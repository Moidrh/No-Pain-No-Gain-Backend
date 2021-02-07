const express = require('express');

const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const {getAllCiudades, createCiudades} = require('../controllers/ciudad');

const pool = require('../database');

const router = Router();

router.get('/search', [validarJWT], getAllCiudades);

router.post('/add', [validarJWT], createCiudades);

module.exports = router;