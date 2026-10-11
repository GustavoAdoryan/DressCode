const { Portifolio } = require('../model');

class PortifolioController {
    async update(req, res) {
        try {
            const { id } = req.params;
            const { Descricao_portifolio, Tempo_experiencia } = req.body;
            const portifolio = await Portifolio.findByPk(id);
            if (!portifolio) {
                return res.status(404).json({ message: 'Portifolio not found' });
            }
            await portifolio.update({ Descricao_portifolio, Tempo_experiencia });
            res.status(200).json(portifolio);
        } catch (error) {
            res.status(500).json({ message: 'Error updating portifolio', error: error.message });
        }
    }
}

module.exports = new PortifolioController();
