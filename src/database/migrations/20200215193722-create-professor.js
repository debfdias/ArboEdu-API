'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Professors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         
        model: 'Users',
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
  down: queryInterface => queryInterface.dropTable('Professors'),
};