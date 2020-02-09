'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all([
        queryInterface.addColumn(
          'Institutions',
          'zip',
          {
            type: Sequelize.STRING
          }
        ),
        queryInterface.addColumn(
          'Institutions',
          'number',
          {
            type: Sequelize.STRING
          }
        ),
        queryInterface.addColumn(
          'Institutions',
          'neighborhood',
          {
            type: Sequelize.DOUBLE
          }
        ),
        queryInterface.addColumn(
          'Institutions',
          'city',
          {
            type: Sequelize.INTEGER
          }
        ),
        queryInterface.addColumn(
          'Institutions',
          'state',
          {
            type: Sequelize.INTEGER
          }
        ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Institutions', 'zip'),
      queryInterface.removeColumn('Institutions', 'number'),
      queryInterface.removeColumn('Institutions', 'neighborhood'),
      queryInterface.removeColumn('Institutions', 'city'),
      queryInterface.removeColumn('Institutions', 'state')
    ]);
  }
};
