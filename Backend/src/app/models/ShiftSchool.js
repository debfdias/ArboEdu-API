module.exports = (sequelize, DataTypes) => {
    const ShiftSchool = sequelize.define('ShiftSchool', {
      shift: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    });
    return ShiftSchool;
  };