'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Students', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    address_city: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    address_neighborhood: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    address_zip: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    address_number: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    authorized: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // User hasMany WorkingDays n:n
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
  down: queryInterface => queryInterface.dropTable('Students'),
};