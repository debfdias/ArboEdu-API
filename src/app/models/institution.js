'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define('Institution', {
    title: DataTypes.STRING,
    phone: {
      type: DataTypes.DOUBLE,
      validate: {
        len: [8, 12],
      },
    },
    address: {
      type: DataTypes.STRING
    },
  }, {});
  Institution.associate = function(models) {
    // associations can be defined here
  };
  return Institution;
};