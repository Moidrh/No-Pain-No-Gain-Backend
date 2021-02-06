const express = require('express');

const {Router} = require('express');
const { getAllSedes, createSede, getSede } = require('../controllers/sede');

const pool = require('../database');

const router = Router();

router.get('/search', getAllSedes);

router.post('/add', createSede);

router.get('/search/:id', getSede);

module.exports = router;