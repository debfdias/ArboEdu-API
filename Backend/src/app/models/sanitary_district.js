'use strict';
module.exports = (sequelize, DataTypes) => {
  const sanitary_district = sequelize.define('sanitary_district', {
    code: DataTypes.STRING
  }, {});
  sanitary_district.associate = function(models) {
    // associations can be defined here
  };
  return sanitary_district;
};