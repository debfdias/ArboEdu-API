'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lectures = sequelize.define('Lectures', {
    professor_id: DataTypes.INTEGER,
    institution_id: DataTypes.INTEGER
  }, {});
  Lectures.associate = function(models) {
    Lectures.belongsTo(models.Professor, {foreignKey: 'professor_id', as: 'professor'});
    Lectures.belongsTo(models.Institution, {foreignKey: 'institution_id', as: 'institution'});
  };
  return Lectures;
};