'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all([
        queryInterface.addColumn(
          'Institutions',
          'socialReason',
          {
            type: Sequelize.STRING
          }
        ),
        queryInterface.addColumn(
          'Institutions',
          'token',
          {
            type: Sequelize.STRING
          }
        ),
        queryInterface.addColumn(
          'Institutions',
          'cnpj',
          {
            type: Sequelize.DOUBLE
          }
        ),
        queryInterface.addColumn(
          'Institutions',
          'sanitaryDistrict',
          {
            type: Sequelize.INTEGER
          }
        ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Institutions', 'socialReason'),
      queryInterface.removeColumn('Institutions', 'token'),
      queryInterface.removeColumn('Institutions', 'cnpj'),
      queryInterface.removeColumn('Institutions', 'sanitaryDistrict')
    ]);
  }
};
