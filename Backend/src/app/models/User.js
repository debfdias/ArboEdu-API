var bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
        len: [8, 11],
      },
    },
    cpf: {
      type: DataTypes.STRING,
      validate:{
        len: [10,11]
      }
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
    extra:{
      type: DataTypes.JSON
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    },
    isVerified: {
      type: DataTypes.BOOLEAN
    },
    confirmEmailToken: {
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
      beforeBulkUpdate: async function(user) {
        if(user.fields.includes('password')){
          console.log(user.fields.password)
          console.log(typeof(user.fields.password))
          const salt = await bcrypt.genSalt(10); //whatever number you want
          user.attributes.password = await bcrypt.hash(user.attributes.password, salt);
        }
      },
      afterCreate: async function(user){
        var Student = sequelize.models.Student;
        var Researcher = sequelize.models.Researcher;
        var Principal = sequelize.models.Principal;
        var Professor = sequelize.models.Professor;
        var Administrator = sequelize.models.Administrator;
        var Jovem_ACE = sequelize.models.Jovem_ACE;
        var Health_Worker = sequelize.models.Health_Worker;
        var Education_Worker = sequelize.models.Education_Worker;
        if (user.role=="aluno"){
          console.log(user.extra.address_city);
          Student.create({
            address_city: user.extra.address_city,
            address_neighborhood: user.extra.address_neighborhood,
            address_zip: user.extra.address_zip,
            address_number: user.extra.address_number,
            authorized: user.extra.authorized,
            UserId: user.id
          })
          .then((newStudent) => {
            /* console.log(newStudent.get()); */
          })
          .catch((err) => {
            console.log("Error while Student creation : ", err)
          })
        }else if(user.role=="pesquisador"){
          Researcher.create({
            institution: user.extra.institution,
            UserId: user.id
          })
          .then((newResearcher) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newResearcher.get())
          })
          .catch((err) => {
            console.log("Error while Researcher creation : ", err)
          })
        }else if(user.role=="diretor"){
          Principal.create({
            UserId: user.id
          })
          .then((newPrincipal) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newPrincipal.get())
          })
          .catch((err) => {
            console.log("Error while Principal creation : ", err)
          })
        }else if(user.role=="professor"){
          Professor.create({
            UserId: user.id
          })
          .then((newProfessor) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newProfessor.get())
          })
          .catch((err) => {
            console.log("Error while Professor creation : ", err)
          })
        }else if(user.role=="administrador"){
          Administrator.create({
            UserId: user.id
          })
          .then((newAdministrator) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newAdministrator.get())
          })
          .catch((err) => {
            console.log("Error while Administrator creation : ", err)
          })
        }else if(user.role=="jovem_ace"){
          Jovem_ACE.create({
            distrito_sanitario: user.extra.distrito_sanitario,
            UserId: user.id
          })
          .then((newJovem_ACE) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newJovem_ACE.get())
          })
          .catch((err) => {
            console.log("Error while Jovem_ACE creation : ", err)
          })
        }else if(user.role=="profissional_saude"){
          Health_Worker.create({
            institution: user.extra.institution,
            UserId: user.id
          })
          .then((newHealth_Worker) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newHealth_Worker.get())
          })
          .catch((err) => {
            console.log("Error while Health_Worker creation : ", err)
          })
        }else if(user.role=="profissional_educacao"){
          Education_Worker.create({
            institution: user.extra.institution,
            UserId: user.id
          })
          .then((newEducation_Worker) => {
            // The get() function allows you to recover only the DataValues of the object
            console.log(newEducation_Worker.get())
          })
          .catch((err) => {
            console.log("Error while Education_Worker creation : ", err)
          })
        }
      }
    }
  });

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }

  User.prototype.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    console.log(this.resetPasswordExpires)
  };

  User.prototype.generateEmailConfirmation = function() {
    this.confirmEmailToken = crypto.randomBytes(20).toString('hex');
  };


  User.associate = function(models) {
    User.hasMany(models.Student, {onDelete: 'CASCADE', hooks: true, as: 'Students'})
  };
  User.associate = function(models) {
    User.hasMany(models.Principal, {onDelete: 'CASCADE', hooks: true, as: "Principals"})
  };
  User.associate = function(models) {
    User.hasMany(models.Jovem_ACE, {onDelete: 'CASCADE', hooks: true, as: "Jovem_ACEs"})
  };
  User.associate = function(models) {
    User.hasMany(models.Professor, {onDelete: 'CASCADE', hooks: true, as: "Professors"})
  };
  User.associate = function(models) {
    User.hasMany(models.Administrator, {onDelete: 'CASCADE', hooks: true, as: "Administrators"})
  };
  User.associate = function(models) {
    User.hasMany(models.Health_Worker, {onDelete: 'CASCADE', hooks: true, as: "Health_Workers"})
  };
  User.associate = function(models) {
    User.hasMany(models.Education_Worker, {onDelete: 'CASCADE', hooks: true, as: "Education_Workers"})
  };
  User.associate = function(models) {
    User.hasMany(models.Researcher, {onDelete: 'CASCADE', hooks: true, as: 'Researchers'})
  };
  return User;
};