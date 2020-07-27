'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classes_Institution = sequelize.define('Classes_Institution', {
    grade: DataTypes.STRING,
    class: DataTypes.STRING,
    shift: DataTypes.STRING,
    institutionId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  }, {});
  Classes_Institution.associate = function(models) {
    Classes_Institution.belongsTo(models.Institution, {foreignKey: 'institutionId', as: 'institution'})
    Classes_Institution.belongsTo(models.Student, {foreignKey: 'studentId', as: 'student'})
  };
  return Classes_Institution;
};