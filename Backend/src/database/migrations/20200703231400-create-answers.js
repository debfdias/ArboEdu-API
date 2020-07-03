'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Answers', {
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
    StudentID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    QuizID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    QuestionID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Answer: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('Answers'),
};