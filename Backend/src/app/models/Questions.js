module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define('Questions', {
      enunciado: DataTypes.STRING,
      nivel: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['FACIL', 'MEDIO', 'DIFICIL']],
              msg: "Nível da questão não é válido"
            }
        }
      },
      resposta_correta: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['A', 'B', 'C', 'D', 'E']],
              msg: "Alternativa não é válida. Tabela Questions"
            }
        }
      },
      justificativa_A: DataTypes.STRING,
      justificativa_B: DataTypes.STRING,
      justificativa_C: DataTypes.STRING,
      justificativa_D: DataTypes.STRING,
      justificativa_E: DataTypes.STRING,
      themes: DataTypes.STRING,
      abilities: DataTypes.STRING,
      BNCC: DataTypes.STRING,
      expected_behavior: DataTypes.STRING,
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
    return Questions;
  };