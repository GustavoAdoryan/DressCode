const express = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');

const router = express.Router();

router.post('/avaliacoes', AvaliacaoController.criarAvaliacao);
router.get('/avaliacoes', AvaliacaoController.listarAvaliacoes);
router.get('/avaliacoes/:usuarioId/:tipo', AvaliacaoController.listarAvaliacoesPorUsuario);

module.exports = router;
