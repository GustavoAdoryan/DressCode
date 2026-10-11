const bcrypt = require('bcrypt');
const { sequelize, Usuario, Atelie, Estilista, Perfil, Portifolio, Agendamento } = require('../model'); // Certifique-se de importar o sequelize aqui

class UsuarioController {
    async create(req, res) {
        try {
            const { Nome, Email, Senha, CPF_CNPJ, Telefone, Tipo } = req.body;
            const hashedPassword = await bcrypt.hash(Senha, 10);
            const usuario = await Usuario.create({ Nome, Email, Senha: hashedPassword, CPF_CNPJ, Telefone, Tipo });
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const usuarios = await Usuario.findAll({
                attributes: { exclude: ['CPF_CNPJ', 'Senha'] },
                include: [
                    { model: Perfil, as: 'perfil' },
                    { model: Atelie, as: 'atelie', include: [{ model: Portifolio, as: 'portifolios' }] },
                    { model: Estilista, as: 'estilista', include: [{ model: Portifolio, as: 'portifolios' }] }
                ]
            });
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id, {
                attributes: { exclude: ['CPF_CNPJ', 'Senha'] },
                include: [
                    { model: Perfil, as: 'perfil' },
                    { model: Atelie, as: 'atelie', include: [{ model: Portifolio, as: 'portifolios' }] },
                    { model: Estilista, as: 'estilista', include: [{ model: Portifolio, as: 'portifolios' }] }
                ]
            });

            if (!usuario) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { Nome, Email, Senha, CPF_CNPJ, Telefone, Tipo } = req.body;
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'User not found' });
            }
            const hashedPassword = Senha ? await bcrypt.hash(Senha, 10) : usuario.Senha;
            await usuario.update({ Nome, Email, Senha: hashedPassword, CPF_CNPJ, Telefone, Tipo });

            // Atualizar tabelas relacionadas
            if (Tipo === 'Atelie') {
                await Atelie.update({ Nome }, { where: { UsuarioID: id } });
            } else if (Tipo === 'Estilista') {
                await Estilista.update({ Nome }, { where: { UsuarioID: id } });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    }

    async delete(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id, { transaction });
            if (!usuario) {
                await transaction.rollback();
                return res.status(404).json({ message: 'User not found' });
            }

            const atelie = await Atelie.findOne({ where: { UsuarioID: id }, transaction });
            const estilista = await Estilista.findOne({ where: { UsuarioID: id }, transaction });

            console.log('Atelie:', atelie);
            console.log('Estilista:', estilista);

            if (atelie) {
                await Portifolio.destroy({ where: { AtelieID: atelie.AtelieID }, transaction });
                await Agendamento.destroy({ where: { AtelieID: atelie.AtelieID }, transaction });
            }
            if (estilista) {
                await Portifolio.destroy({ where: { EstilistaID: estilista.EstilistaID }, transaction });
                await Agendamento.destroy({ where: { EstilistaID: estilista.EstilistaID }, transaction });
            }

            if (atelie) {
                await atelie.destroy({ transaction });
            }
            if (estilista) {
                await estilista.destroy({ transaction });
            }
            await Perfil.destroy({ where: { UsuarioID: id }, transaction });

            await usuario.destroy({ transaction });
            await transaction.commit();

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            await transaction.rollback();
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }

    async search(req, res) {
        try {
            const { tipo } = req.params;

            if (!tipo) {
                return res.status(400).json({ message: 'Tipo is required' });
            }

            console.log(`Searching for users of type: ${tipo}`);

            const usuarios = await Usuario.findAll({
                where: { Tipo: tipo },
                attributes: { exclude: ['CPF_CNPJ', 'Senha'] },
                include: [
                    { model: Perfil, as: 'perfil' },
                    { model: Atelie, as: 'atelie', required: tipo === 'Atelie', include: [{ model: Portifolio, as: 'portifolios' }] },
                    { model: Estilista, as: 'estilista', required: tipo === 'Estilista', include: [{ model: Portifolio, as: 'portifolios' }] }
                ]
            });

            console.log(`Found users: ${JSON.stringify(usuarios, null, 2)}`);

            const formattedUsuarios = usuarios.map(usuario => {
                const formattedUsuario = usuario.toJSON();
                if (formattedUsuario.atelie === null) {
                    delete formattedUsuario.atelie;
                }
                if (formattedUsuario.estilista === null) {
                    delete formattedUsuario.estilista;
                }
                return formattedUsuario;
            });

            res.status(200).json(formattedUsuarios);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }
}

module.exports = new UsuarioController();
