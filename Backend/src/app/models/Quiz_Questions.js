module.exports = (sequelize, DataTypes) => {
    const Quiz_Questions = sequelize.define('Quiz_Questions', {
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       },
       QuizId: DataTypes.INTEGER,
       QuestionId: DataTypes.INTEGER  
    });
    return Quiz_Questions;
  };