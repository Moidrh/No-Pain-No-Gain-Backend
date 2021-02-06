/**
 * Ruta: /api/usuarios
 */

const {Router} = require('express');
const { getAllUsuarios, createUsuarios, getUsuario } = require('../controllers/usuarios');

const pool = require('../database');

const router = Router();

router.get('/search', getAllUsuarios);

router.post('/add', createUsuarios);

router.get('/search/:id', getUsuario);

module.exports = router;