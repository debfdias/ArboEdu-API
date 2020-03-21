module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define('Professor', {
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
    Professor.associate = function(models) {
      Professor.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Professor;
  };