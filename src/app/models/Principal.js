module.exports = (sequelize, DataTypes) => {
    const Principal = sequelize.define('Principal', {
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
    Principal.associate = function(models) {
      Principal.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Principal;
  };