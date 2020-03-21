'use strict';
module.exports = (sequelize, DataTypes) => {
  const AceInstitution = sequelize.define('AceInstitution', {
    ace_id: DataTypes.INTEGER,
    institution_id: DataTypes.INTEGER
  }, {});
  AceInstitution.associate = function(models) {
  	AceInstitution.belongsTo(models.Jovem_ACE, {foreignKey: 'ace_id', as: 'ace'});
    AceInstitution.belongsTo(models.Institution, {foreignKey: 'institution_id', as: 'institution'});
  };
  return AceInstitution;
};