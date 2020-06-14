const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define('Files', {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    data: DataTypes.BLOB,
    url: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async function(files) {
        if (!this.url) {
          files.url = `http://localhost:3001/files/${files.name}`;
        }
      },
      afterDestroy: async function(files) {
        return promisify(fs.unlink)( path.resolve(__basedir + "/resources/uploads/", files.name) );
      }
    }
  });
  
  Files.associate = function(models) {
    Files.belongsTo(models.User, {foreignKey: 'user_id', as: 'User'})
  };
  return Files;
};