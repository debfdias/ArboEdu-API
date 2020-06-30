'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Quiz_Questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    QuizId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    QuestionId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('Quiz_Questions'),
};