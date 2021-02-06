const express = require('express');
const {isLoggedIn} =require('../lib/auth');

const {Router} = require('express');
const { getAllSedes, createSede, getSede } = require('../controllers/sede');

const pool = require('../database');

const router = Router();

router.get('/search', isLoggedIn, getAllSedes);

router.post('/add', isLoggedIn, createSede);

router.get('/search/:id', isLoggedIn, getSede);

module.exports = router;