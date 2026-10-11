const express = require('express');
const cors = require('cors');
const UsuarioController = require('../controller/UsuarioController');

const router = express.Router();

router.post('/usuarios', UsuarioController.create);
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', UsuarioController.getById);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);
router.get('/usuarios/search/:tipo', UsuarioController.search);

module.exports = router;
