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
    socialReason: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    },
    cnpj: {
      type: DataTypes.STRING
    },
    sanitaryDistrict: {
      type: DataTypes.INTEGER
    },
  }, {});
  Institution.associate = function(models) {
    // associations can be defined here
  };
  return Institution;
};