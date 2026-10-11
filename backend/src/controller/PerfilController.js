const { Perfil } = require('../model');

class PerfilController {
    async update(req, res) {
        try {
            const { id } = req.params;
            const { Biografia, FotoPerfil } = req.body;
            const perfil = await Perfil.findByPk(id);
            if (!perfil) {
                return res.status(404).json({ message: 'Perfil not found' });
            }

            await perfil.update({ Biografia, FotoPerfil });

            res.status(200).json(perfil);
        } catch (error) {
            res.status(500).json({ message: 'Error updating perfil', error: error.message });
        }
    }
}

module.exports = new PerfilController();
