const express = require('express');
const PerfilController = require('../controller/PerfilController');

const router = express.Router();

router.put('/perfil/:id', PerfilController.update);

module.exports = router;
