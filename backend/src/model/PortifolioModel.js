// PortifolioModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase');
const Atelie = require('./AtelieModel');
const Estilista = require('./EstilistaModel');

const Portifolio = sequelize.define('Portifolio', {
    PortifolioID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    EstilistaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Estilista,
            key: 'EstilistaID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    AtelieID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Atelie,
            key: 'AtelieID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    Descricao_portifolio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Tempo_experiencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'portifolio',
    timestamps: false,
});

module.exports = Portifolio;
