'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classes_Institution = sequelize.define('Classes_Institution', {
    grade: DataTypes.STRING,
    class: DataTypes.STRING,
    shift: DataTypes.STRING,
    institutionId: DataTypes.INTEGER
  }, {});
  Classes_Institution.associate = function(models) {
    Classes_Institution.belongsTo(models.Institution, {foreignKey: 'institutionId', as: 'institution'})
  };
  return Classes_Institution;
};