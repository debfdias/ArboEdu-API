module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define('School', {
      phone: {
        type: DataTypes.STRING,
        validate: {
          len: [8, 11],
        },
      },
      razaoSocial: DataTypes.STRING,
      cnpj: {
        type: DataTypes.STRING,
        validate: {
          len: [14, 18],
        },
      },
      token: DataTypes.STRING,
      gerencia_regional_educacao: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    });
    return School;
  };