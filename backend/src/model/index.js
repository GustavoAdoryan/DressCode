const sequelize = require('../config/DataBase');
const Usuario = require('./UsuarioModel');
const Atelie = require('./AtelieModel');
const Estilista = require('./EstilistaModel');
const Perfil = require('./PerfilModel');
const Portifolio = require('./PortifolioModel');
const Agendamento = require('./AgendamentoModel');

// Um usuário pode ter um ateliê associado. Se o usuário for deletado ou atualizado, o ateliê será afetado de acordo.
Usuario.hasOne(Atelie, { foreignKey: 'UsuarioID', as: 'atelie', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Um usuário pode ter um estilista associado. Se o usuário for deletado ou atualizado, o estilista será afetado de acordo.
Usuario.hasOne(Estilista, { foreignKey: 'UsuarioID', as: 'estilista', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Um usuário pode ter um perfil associado. Se o usuário for deletado ou atualizado, o perfil será afetado de acordo.
Usuario.hasOne(Perfil, { foreignKey: 'UsuarioID', as: 'perfil', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Um ateliê pertence a um usuário específico.
Atelie.belongsTo(Usuario, { foreignKey: 'UsuarioID', as: 'usuario' });

// Um estilista pertence a um usuário específico.
Estilista.belongsTo(Usuario, { foreignKey: 'UsuarioID', as: 'usuario' });

// Um perfil pertence a um usuário específico.
Perfil.belongsTo(Usuario, { foreignKey: 'UsuarioID', as: 'usuario' });

// Um estilista pode ter vários portfólios. Se o estilista for deletado ou atualizado, os portfólios serão afetados de acordo.
Estilista.hasMany(Portifolio, { foreignKey: 'EstilistaID', as: 'portifolios', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Um ateliê pode ter vários portfólios. Se o ateliê for deletado ou atualizado, os portfólios serão afetados de acordo.
Atelie.hasMany(Portifolio, { foreignKey: 'AtelieID', as: 'portifolios', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Um portfólio pertence a um estilista específico.
Portifolio.belongsTo(Estilista, { foreignKey: 'EstilistaID', as: 'estilista' });

// Um portfólio pertence a um ateliê específico.
Portifolio.belongsTo(Atelie, { foreignKey: 'AtelieID', as: 'atelie' });

// Um estilista pode ter vários agendamentos. Se o estilista for deletado ou atualizado, os agendamentos serão afetados de acordo.
Estilista.hasMany(Agendamento, { foreignKey: 'EstilistaID', as: 'agendamentos', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Um ateliê pode ter vários agendamentos. Se o ateliê for deletado ou atualizado, os agendamentos serão afetados de acordo.
Atelie.hasMany(Agendamento, { foreignKey: 'AtelieID', as: 'agendamentos', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Um agendamento pertence a um estilista específico.
Agendamento.belongsTo(Estilista, { foreignKey: 'EstilistaID', as: 'estilista' });

// Um agendamento pertence a um ateliê específico.
Agendamento.belongsTo(Atelie, { foreignKey: 'AtelieID', as: 'atelie' });

module.exports = {
    sequelize,
    Usuario,
    Atelie,
    Estilista,
    Perfil,
    Portifolio,
    Agendamento,
};
