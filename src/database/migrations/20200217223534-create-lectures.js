'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lectures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      professor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'Professors',
          key: 'id'
        }
      },
      institution_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'Institutions',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lectures');
  }
};