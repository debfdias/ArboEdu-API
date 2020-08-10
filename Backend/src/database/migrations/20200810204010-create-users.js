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
    resetPasswordToken:{
      allowNull: true,
      type: Sequelize.TEXT
    },
    resetPasswordExpires: {
      allowNull: true,
      type: Sequelize.DATE
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    confirmEmailToken:{
      allowNull: true,
      type: Sequelize.TEXT
    },
    lastCookie:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    avatar_id: {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
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