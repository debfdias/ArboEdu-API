'use strict';
module.exports = (sequelize, DataTypes) => {
  const ColetaReciclagem = sequelize.define('ColetaReciclagem', {
    student_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    feedback_video: DataTypes.TEXT,
    receipt_id: DataTypes.INTEGER,
    status_receipt: DataTypes.INTEGER
  }, {});
  ColetaReciclagem.associate = function(models) {
    ColetaReciclagem.belongsTo(models.Quiz, {foreignKey: 'quiz_id', as: 'quiz'}),
    ColetaReciclagem.belongsTo(models.Files, {foreignKey: 'receipt_id', as: 'receipt'})
  };
  return ColetaReciclagem;
};