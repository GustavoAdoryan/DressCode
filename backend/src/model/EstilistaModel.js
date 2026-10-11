const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase');
const Usuario = require('./UsuarioModel');

const Estilista = sequelize.define('Estilista', {
    EstilistaID: {
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
    tableName: 'estilista',
    timestamps: false,
});

module.exports = Estilista;
