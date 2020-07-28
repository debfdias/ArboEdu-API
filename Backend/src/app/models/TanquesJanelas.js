const Files = require('./files');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const TanquesJanelas = sequelize.define('TanquesJanelas', {
    student_id: DataTypes.INTEGER,
    local_type: DataTypes.STRING,
    focus_type: DataTypes.STRING,
    solution: DataTypes.TEXT,
    additional_comment: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    photo: {
      type: DataTypes.VIRTUAL,
      async get () {
        const photos = await Files.findAll({ where: { user_id: this.student_id } })
        return photos
      }
    },
  }, {});
  TanquesJanelas.associate = function(models) {
    // associations can be defined here
  };
  return TanquesJanelas;
};