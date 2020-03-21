'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Institutions',
        'phone',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Institutions',
        'address',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Institutions', 'phone'),
      queryInterface.removeColumn('Institutions', 'address')
    ]);
  }
};
