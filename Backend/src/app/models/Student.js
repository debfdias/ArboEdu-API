module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    address_city: DataTypes.STRING,
    address_neighborhood: DataTypes.STRING,
    address_zip: DataTypes.STRING,
    address_number: DataTypes.STRING,
    address_complement: DataTypes.STRING,
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
  /* Student.associate = function(models) {
    Student.belongsTo(models.Quiz_Student_Questions, {foreignKey: 'Quiz_Student_QuestionsId', as: 'Quiz_Student_Questions'})
  }; */
  return Student;
};