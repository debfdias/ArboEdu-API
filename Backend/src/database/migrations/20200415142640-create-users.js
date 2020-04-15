'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    phone: {
      allowNull: false,
      type: Sequelize.DOUBLE,
    },
    cpf:{
      allowNull: false,
      type: Sequelize.STRING
    },
    birthday:{
      allowNull: false,
      type: Sequelize.DATE
    },
    password:{
      type: Sequelize.STRING
    },
    role:{
      type: Sequelize.STRING
    },
    extra:{
      allowNull: true,
      type: Sequelize.TEXT
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
  down: queryInterface => queryInterface.dropTable('Users'),
};