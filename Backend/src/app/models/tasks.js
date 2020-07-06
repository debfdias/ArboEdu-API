'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    type: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {});
  Tasks.associate = function(models) {
    // associations can be defined here
  };
  return Tasks;
};