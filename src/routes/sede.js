const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');

const {Router} = require('express');
const { getAllSedes, createSede, getSede } = require('../controllers/sede');

const pool = require('../database');

const router = Router();

router.get('/search', [validarJWT], getAllSedes);

router.post('/add', [validarJWT, check('name').not().isEmpty(), check('user_id').not().isEmpty(), check('ciudad_id').not().isEmpty(), validarCampo], createSede);

router.get('/search/user', [validarJWT, check('name').not().isEmpty(), validarCampo], getSede);

module.exports = router;