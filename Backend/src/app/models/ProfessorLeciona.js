module.exports = (sequelize, DataTypes) => {
    const ProfessorLeciona = sequelize.define('ProfessorLeciona', {
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    });
    return ProfessorLeciona;
  };