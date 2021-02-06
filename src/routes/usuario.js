/**
 * Ruta: /api/usuarios
 */

const {Router} = require('express');
const {isLoggedIn} =require('../lib/auth');
const { getAllUsuarios, createUsuarios, getUsuario } = require('../controllers/usuarios');

const pool = require('../database');

const router = Router();

router.get('/search', isLoggedIn, getAllUsuarios);

router.post('/add', isLoggedIn, createUsuarios);

router.get('/search/:id', isLoggedIn, getUsuario);

module.exports = router;