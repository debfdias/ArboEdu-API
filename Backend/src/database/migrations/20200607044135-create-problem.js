'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Problems', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    code: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    user_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    file_location:{
      allowNull: true,
      type: Sequelize.STRING
    },
    user_return:{
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
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // User hasMany WorkingDays n:n
        model: 'Users',
        key: 'id'
      }
    },
  }),
  down: queryInterface => queryInterface.dropTable('Problems'),
};