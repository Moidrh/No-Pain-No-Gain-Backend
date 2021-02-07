/**
 * Ruta: /api/home
 */

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [validarJWT], (req, res) => {
  console.log('HOME')
  res.json({
    ok: true,
    msg: 'home'
  });
});

module.exports = router;