'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PatrulhasEmFoco', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    data_inicial:{
      allowNull: false,
      type: Sequelize.DATE
    },
    data_final:{
      allowNull: false,
      type: Sequelize.DATE
    },
    lista_focos:{
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
  }),
  down: queryInterface => queryInterface.dropTable('PatrulhasEmFoco'),
};