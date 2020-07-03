module.exports = (sequelize, DataTypes) => {
    const Answers = sequelize.define('Answers', {
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       },
       StudentID: DataTypes.INTEGER,
       QuizID: DataTypes.INTEGER,
       QuestionID: DataTypes.INTEGER,
       Answer: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['A', 'B', 'C', 'D', 'E']],
              msg: "Alternativa não é válida. Tabela Answers"
            }
        }
      },
    });
    return Answers;
  };