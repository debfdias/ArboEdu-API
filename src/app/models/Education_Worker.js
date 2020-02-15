module.exports = (sequelize, DataTypes) => {
    const Education_Worker = sequelize.define('Education_Worker', {
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
    Education_Worker.associate = function(models) {
      Education_Worker.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Education_Worker;
  };