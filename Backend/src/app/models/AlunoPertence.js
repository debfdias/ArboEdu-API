module.exports = (sequelize, DataTypes) => {
    const AlunoPertence = sequelize.define('AlunoPertence', {
      grade: DataTypes.STRING,
      shift: DataTypes.STRING,
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
    return AlunoPertence;
  };