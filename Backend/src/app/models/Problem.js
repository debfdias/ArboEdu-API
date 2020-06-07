module.exports = (sequelize, DataTypes) => {
    const Problem = sequelize.define('Problem', {
      status: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['PENDENTE', 'RESOLUÇÃO', 'AGUARDANDO_USUÁRIO', 'RESOLVIDO']],
              msg: "Status do chamado não é válido"
            }
        }
      },
      user_name: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      file_location: DataTypes.STRING,
      user_return: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    }, {});
    Problem.associate = function(models) {
      Problem.belongsTo(models.User, {foreignKey: 'UserId', as: 'User'})
    };
    return Problem;
  };