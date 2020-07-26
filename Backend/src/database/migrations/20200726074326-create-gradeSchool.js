'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ShiftSchool', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    grade: {
      allowNull: false,
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('ShiftSchool'),
};