module.exports = (sequelize, DataTypes) => {
    const GradeSchool = sequelize.define('GradeSchool', {
      grade: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    });
    return GradeSchool;
  };