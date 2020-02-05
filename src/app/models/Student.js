module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    address_city: DataTypes.STRING,
    address_neighborhood: DataTypes.STRING,
    address_zip: DataTypes.STRING,
    address_number: DataTypes.STRING,
    authorized: DataTypes.BOOLEAN,
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
  Student.associate = function(models) {
    Student.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
  };
  return Student;
};