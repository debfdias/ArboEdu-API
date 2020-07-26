module.exports = (sequelize, DataTypes) => {
    const TablePertence = sequelize.define('TablePertence', {
      grade: DataTypes.STRING,
      shift: DataTypes.STRING,
      class: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    });
    return TablePertence;
  };