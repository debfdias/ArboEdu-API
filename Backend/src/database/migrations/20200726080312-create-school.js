'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('School', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    razaoSocial: {
      allowNull: false,
      type: Sequelize.STRING
    },
    cnpj: {
      allowNull: false,
      type: Sequelize.STRING
    },
    token:{
      allowNull: false,
      type: Sequelize.STRING
    },
    gerencia_regional_educacao: {
      allowNull: false,
      type: Sequelize.STRING
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('School'),
};