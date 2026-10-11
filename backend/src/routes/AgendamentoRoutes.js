const express = require('express');
const AgendamentoController = require('../controller/AgendamentoController');

const router = express.Router();

router.post('/agendamentos', AgendamentoController.criarAgendamento);
router.get('/agendamentos', AgendamentoController.listarAgendamentos);
router.put('/agendamentos/:id', AgendamentoController.atualizarAgendamento);
router.delete('/agendamentos/:id', AgendamentoController.deletarAgendamento);
router.get('/agendamentos/status/:status', AgendamentoController.listarAgendamentosPorStatus);
router.get('/agendamentos/estilista/:estilistaId', AgendamentoController.listarAgendamentosPorEstilista);
router.get('/agendamentos/atelie/:atelieId', AgendamentoController.listarAgendamentosPorAtelie);
router.get('/agendamentos/estilista/:estilistaId/status/:status', AgendamentoController.listarAgendamentosPorEstilistaEStatus);
router.get('/agendamentos/atelie/:atelieId/status/:status', AgendamentoController.listarAgendamentosPorAtelieEStatus);

module.exports = router;
