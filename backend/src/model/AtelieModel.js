const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase');
const Usuario = require('./UsuarioModel');

const Atelie = sequelize.define('Atelie', {
    AtelieID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'UsuarioID',
        },
    },
    VerificacaoDocumentos: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente',
    },
}, {
    tableName: 'atelie',
    timestamps: false,
});

module.exports = Atelie;
