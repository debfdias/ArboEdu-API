'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Classes_Institutions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      grade: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      shift: {
        type: Sequelize.STRING
      },
      institutionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'Institutions',
          key: 'id'
        }
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'Students',
          key: 'id'
        }
      },
      professorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'Professors',
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
    return queryInterface.dropTable('Classes_Institutions');
  }
};