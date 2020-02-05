var bcrypt = require('bcryptjs');
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
    birthday:{
      type: DataTypes.DATE
    },
    password:{
      type: DataTypes.STRING
    },
    role:{
      type: DataTypes.STRING
    },
    createdAt: {
         field: 'created_at',
         type: DataTypes.DATE,
     },
     updatedAt: {
         field: 'updated_at',
         type: DataTypes.DATE,
     }  
  }, {
    hooks: {
      beforeCreate: async function(user) {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
      },
      afterCreate: async function(user){
        var Student = sequelize.models.Student;
        if (user.role=="aluno"){
          Student.create({
            address_city: "Recife",
            address_neighborhood: "Várzea",
            address_zip: "50740040",
            address_number: "645",
            authorized: 1,
            UserId: user.id
          })
          .then((newStudent) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newStudent.get())
          })
          .catch((err) => {
            console.log("Error while Student creation : ", err)
          })
        }
      }
    }
  });

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  User.associate = function(models) {
    User.hasMany(models.Student, {as: 'Students'})
  };

  return User;
};