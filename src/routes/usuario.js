/**
 * Ruta: /api/usuarios
 */

const {Router} = require('express');
const {isLoggedIn} =require('../lib/auth');
const { getAllUsuarios, createUsuarios, getUsuario } = require('../controllers/usuarios');
const {check} = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');

const pool = require('../database');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/search', [validarJWT], getAllUsuarios);

router.post('/add', [check('username').isEmail(), check('password').not().isEmpty(), validarCampo], createUsuarios);

router.get('/search/:id', [validarJWT], getUsuario);

module.exports = router;