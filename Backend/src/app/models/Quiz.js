module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define('Quiz', {
      nome: DataTypes.STRING,
      data_finalizacao: DataTypes.DATE,
      list_questions: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    }
    );
    return Quiz;
  };