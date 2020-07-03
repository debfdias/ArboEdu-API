module.exports = (sequelize, DataTypes) => {
    const Quiz_Questions_Answers = sequelize.define('Quiz_Questions_Answers', {
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       },
       StudentID: DataTypes.INTEGER,
       Quiz_QuestionID: DataTypes.INTEGER,
       Answer: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['A', 'B', 'C', 'D', 'E']],
              msg: "Alternativa não é válida. Tabela Quiz_Questions_Answers"
            }
        }
      },
    });
    return Quiz_Questions_Answers;
  };