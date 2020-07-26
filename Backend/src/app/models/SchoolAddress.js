module.exports = (sequelize, DataTypes) => {
    const SchoolAddress = sequelize.define('SchoolAddress', {
      address_city: DataTypes.STRING,
      address_neighborhood: DataTypes.STRING,
      address_zip: DataTypes.STRING,
      address_number: DataTypes.STRING,
      address_complement: DataTypes.STRING,
      createdAt: {
           field: 'created_at',
           type: DataTypes.DATE,
       },
       updatedAt: {
           field: 'updated_at',
           type: DataTypes.DATE,
       }  
    });
    return SchoolAddress;
  };