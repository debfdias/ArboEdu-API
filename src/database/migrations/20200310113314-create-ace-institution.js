'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AceInstitutions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ace_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'Jovem_ACEs',
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
    return queryInterface.dropTable('AceInstitutions');
  }
};