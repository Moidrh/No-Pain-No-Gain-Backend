const express = require('express');

const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampo } = require('../middlewares/validar-campos');
const {check} = require('express-validator');

const {getAllCiudades, createCiudades, getUsuariosByCiudad} = require('../controllers/ciudad');

const pool = require('../database');

const router = Router();

router.get('/search', [validarJWT], getAllCiudades);

router.post('/add', [validarJWT, check('nameCiudad').not().isEmpty(), check('nameSede').not().isEmpty(), validarCampo], createCiudades);

router.get('/search/usuarios/:ciudad', validarJWT, getUsuariosByCiudad);

module.exports = router;