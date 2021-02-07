/**
 * Ruta: /api/usuarios
 */

const {Router} = require('express');
const { getAllUsuarios, createUsuarios, getUsuario, createUsuariosAdmin } = require('../controllers/usuarios');
const {check} = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');

const pool = require('../database');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/search', [validarJWT], getAllUsuarios);

router.post('/add', [check('username').isEmail(), check('password').not().isEmpty(), check('nameCiudad').not().isEmpty(), check('nameSede').not().isEmpty(), validarCampo], createUsuarios);

router.post('/add/admin', [check('username').isEmail(), check('password').not().isEmpty(), validarCampo], createUsuariosAdmin);

router.get('/search/:username', validarJWT, getUsuario);

module.exports = router;