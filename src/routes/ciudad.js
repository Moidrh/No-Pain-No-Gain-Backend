const express = require('express');

const {Router} = require('express');

const {getAllCiudades, createCiudades} = require('../controllers/ciudad');

const pool = require('../database');

const router = Router();

router.get('/search', getAllCiudades);

router.post('/add', createCiudades);

module.exports = router;