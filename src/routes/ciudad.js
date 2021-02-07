const express = require('express');

const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampo } = require('../middlewares/validar-campos');
const {check} = require('express-validator');

const {getAllCiudades, createCiudades} = require('../controllers/ciudad');

const pool = require('../database');

const router = Router();

router.get('/search', [validarJWT], getAllCiudades);

router.post('/add', [validarJWT, check('user_id').not().isEmpty(), check('name').not().isEmpty(), validarCampo], createCiudades);

module.exports = router;