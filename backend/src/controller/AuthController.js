const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize, Usuario, Atelie, Estilista, Perfil, Portifolio } = require('../model');
const { Op } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

class AuthController {
    async register(req, res) {
        try {
            const { Nome, Email, Senha, CPF_CNPJ, Telefone, Tipo } = req.body;
            if (!Nome || !Email || !Senha || !CPF_CNPJ || !Telefone || !Tipo) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            }

            const existingUser = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { Email },
                        { CPF_CNPJ },
                        { Telefone }
                    ]
                }
            });

            if (existingUser) {
                return res.status(400).json({ message: 'Email, CPF/CNPJ ou Telefone já cadastrado' });
            }

            const hashedPassword = await bcrypt.hash(Senha, 10);
            const usuario = await Usuario.create({ Nome, Email, Senha: hashedPassword, CPF_CNPJ, Telefone, Tipo });

            if (Tipo === 'Atelie') {
                const atelie = await Atelie.create({ Nome, UsuarioID: usuario.UsuarioID, VerificacaoDocumentos: 'Pendente' });
                await Portifolio.create({ AtelieID: atelie.AtelieID, Descricao_portifolio: null, Tempo_experiencia: null });
            } else if (Tipo === 'Estilista') {
                const estilista = await Estilista.create({ Nome, UsuarioID: usuario.UsuarioID, VerificacaoDocumentos: 'Pendente' });
                await Portifolio.create({ EstilistaID: estilista.EstilistaID, Descricao_portifolio: null, Tempo_experiencia: null });
            }

            await Perfil.create({ UsuarioID: usuario.UsuarioID });

            res.status(201).json({ message: 'User created successfully', usuario });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { Email, Senha } = req.body;
            const usuario = await Usuario.findOne({
                where: { Email },
                include: [
                    { model: Perfil, as: 'perfil' },
                    { model: Atelie, as: 'atelie', include: [{ model: Portifolio, as: 'portifolios' }] },
                    { model: Estilista, as: 'estilista', include: [{ model: Portifolio, as: 'portifolios' }] },
                ],
            });
            if (!usuario) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(Senha, usuario.Senha);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: usuario.UsuarioID }, process.env.JWT_SECRET, { expiresIn: '1h' });

            const responseUsuario = usuario.toJSON();
            res.status(200).json({
                message: 'Login successful',
                token,
                usuario: responseUsuario
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }
}

module.exports = new AuthController();
