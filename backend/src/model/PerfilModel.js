const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase');
const Usuario = require('./UsuarioModel');

const Perfil = sequelize.define('Perfil', {
    PerfilID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'UsuarioID',
        },
    },
    Biografia: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    FotoPerfil: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'perfil',
    timestamps: false,
});

module.exports = Perfil;
