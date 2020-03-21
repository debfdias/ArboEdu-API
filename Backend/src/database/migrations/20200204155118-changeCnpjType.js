'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn('Institutions', 'cnpj',
      {
        type: Sequelize.INTEGER
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Institutions', 'cnpj',
    {
      type: Sequelize.INTEGER
    
    });
  }
};
