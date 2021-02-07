const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const {Router} = require('express');
const { getAllSedes, createSede, getSede } = require('../controllers/sede');

const pool = require('../database');

const router = Router();

router.get('/search', [validarJWT], getAllSedes);

router.post('/add', [validarJWT], createSede);

router.get('/search/:id', [validarJWT], getSede);

module.exports = router;