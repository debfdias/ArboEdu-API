module.exports = (sequelize, DataTypes) => {
    const Researcher = sequelize.define('Researcher', {
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
    Researcher.associate = function(models) {
      Researcher.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Researcher;
  };