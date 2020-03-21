module.exports = (sequelize, DataTypes) => {
    const Jovem_ACE = sequelize.define('Jovem_ACE', {
      distrito_sanitario: DataTypes.STRING,
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
    Jovem_ACE.associate = function(models) {
      Jovem_ACE.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Jovem_ACE;
  };