'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Quizzes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    data_finalizacao: {
      allowNull: false,
      type: Sequelize.DATE
    },
    list_questions:{
      allowNull: true,
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
  down: queryInterface => queryInterface.dropTable('Quizzes'),
};