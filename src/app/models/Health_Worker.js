module.exports = (sequelize, DataTypes) => {
    const Health_Worker = sequelize.define('Health_Worker', {
    institution: DataTypes.STRING,
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
    Health_Worker.associate = function(models) {
      Health_Worker.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Health_Worker;
  };