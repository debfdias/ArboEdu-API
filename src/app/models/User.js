module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.DOUBLE,
      validate: {
        len: [8, 12],
      },
    },
    cpf: {
      type: DataTypes.STRING
    },
    birthDay:{
      type: DataTypes.DATE
    },
    createdAt: {
         field: 'created_at',
         type: DataTypes.DATE,
     },
     updatedAt: {
         field: 'updated_at',
         type: DataTypes.DATE,
     },
  });

  return User;
};