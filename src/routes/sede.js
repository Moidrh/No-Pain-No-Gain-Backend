const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');

const {Router} = require('express');
const { getAllSedes, createSede, getUserBySede, getSedeByCiudad } = require('../controllers/sede');

const pool = require('../database');

const router = Router();

router.get('/search', [validarJWT], getAllSedes);

router.post('/add', [validarJWT, check('name').not().isEmpty(), validarCampo], createSede);

router.get('/search/:sede', validarJWT, getUserBySede);

router.get('/search/ciudad/:ciudad', validarJWT, getSedeByCiudad);

module.exports = router;