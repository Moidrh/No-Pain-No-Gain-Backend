/**
 * Ruta: /api/home
 */

const {Router} = require('express');
const {isLoggedIn} =require('../lib/auth');

const router = Router();

router.get('/', isLoggedIn, (req, res) => {
  res.json({
    ok: true,
    msg: 'home'
  });
});

module.exports = router;