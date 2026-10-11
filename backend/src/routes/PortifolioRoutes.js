const express = require('express');
const PortifolioController = require('../controller/PortifolioController');

const router = express.Router();

router.put('/portifolio/:id', PortifolioController.update);

module.exports = router;
