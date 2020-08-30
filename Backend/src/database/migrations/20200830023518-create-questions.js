'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    enunciado: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    nivel: {
      allowNull: false,
      type: Sequelize.DATE
    },
    resposta_correta:{
      allowNull: false,
      type: Sequelize.STRING
    },
    justificativa_A:{
      allowNull: false,
      type: Sequelize.STRING
    },
    justificativa_B:{
      allowNull: false,
      type: Sequelize.STRING
    },
    justificativa_C:{
      allowNull: false,
      type: Sequelize.STRING
    },
    justificativa_D:{
      allowNull: false,
      type: Sequelize.STRING
    },
    justificativa_E:{
      allowNull: false,
      type: Sequelize.STRING
    },
    themes:{
      type: Sequelize.STRING,
      allowNull: false
    },
    abilities: {
      type: Sequelize.STRING,
      allowNull: false
    },
    BNCC: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expected_behavior: {
      type: Sequelize.STRING,
      allowNull: false
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
  down: queryInterface => queryInterface.dropTable('Questions'),
};