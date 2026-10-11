const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase');

const Usuario = sequelize.define('Usuario', {
    UsuarioID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CPF_CNPJ: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Tipo: {
        type: DataTypes.ENUM('Atelie', 'Estilista'),
        allowNull: false,
    }
}, {
    tableName: 'usuario',
    timestamps: false,
});

module.exports = Usuario;
