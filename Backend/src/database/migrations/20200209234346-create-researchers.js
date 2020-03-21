'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Researchers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    institution: {
      allowNull: false,
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Researchers'),
};