'use strict';
module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define('Files', {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    data: DataTypes.BLOB,
    url: DataTypes.STRING
  }, {});
  Files.associate = function(models) {
    // associations can be defined here
  };
  return Files;
};