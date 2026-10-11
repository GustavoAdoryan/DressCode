const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase');

const Agendamento = sequelize.define('Agendamento', {
    AgendamentoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    DataHora: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EstilistaID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    AtelieID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Status: {  // Adicionando a coluna status
        type: DataTypes.ENUM('ativo', 'cancelado', 'finalizado'),
        defaultValue: 'ativo',
        allowNull: false,
    }
}, {
    tableName: 'agendamento',
    timestamps: false,
});

module.exports = Agendamento;
