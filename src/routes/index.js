/**
 * Ruta: /api/usuarios
 */

const {Router} = require('express');
const { getUsuarios, createUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);

router.post('/', createUsuarios);

module.exports = router;