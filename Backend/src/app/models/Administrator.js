module.exports = (sequelize, DataTypes) => {
    const Administrator = sequelize.define('Administrator', {
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    }, {
      hooks: {
      }
    });
    Administrator.associate = function(models) {
      Administrator.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Administrator;
  };