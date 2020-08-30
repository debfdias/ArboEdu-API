module.exports = (sequelize, DataTypes) => {
    const PatrulhaEmFoco = sequelize.define('PatrulhaEmFoco', {
    data_inicial: DataTypes.DATE,
    data_final: DataTypes.DATE,
    lista_focos: DataTypes.STRING,
    createdAt: {
        field: 'created_at',
            type: DataTypes.DATE,
       },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    }  
    });
    
    return PatrulhaEmFoco;
  };