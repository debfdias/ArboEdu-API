module.exports = (sequelize, DataTypes) => {
    const ClassSchool = sequelize.define('ClassSchool', {
      class: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    });
    return ClassSchool;
  };