'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AlunoPertence', {
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
    shift: {
      allowNull: false,
      type: Sequelize.STRING
    },
    class: {
      allowNull: false,
      type: Sequelize.STRING
    },
    StudentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // User hasMany WorkingDays n:n
        model: 'Student',
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
  down: queryInterface => queryInterface.dropTable('AlunoPertence'),
};