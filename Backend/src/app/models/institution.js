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
    zip: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    number: {
      type: DataTypes.STRING
    },
    neighborhood: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
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
    Institution.hasMany(models.Classes_Institution, {as: 'classes_institution'})
  };
  return Institution;
};