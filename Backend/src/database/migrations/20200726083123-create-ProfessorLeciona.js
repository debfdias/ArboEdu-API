'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProfessorLeciona', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ProfessorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // User hasMany WorkingDays n:n
        model: 'Professor',
        key: 'id'
      }
    },
    SchoolId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // User hasMany WorkingDays n:n
        model: 'Schools',
        key: 'id'
      }
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
  down: queryInterface => queryInterface.dropTable('ProfessorLeciona'),
};