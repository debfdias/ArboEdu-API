module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define('School', {
      phone: DataTypes.STRING,
      razaoSocial: DataTypes.STRING,
      cnpj: DataTypes.STRING,
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