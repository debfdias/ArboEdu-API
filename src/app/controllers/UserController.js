const { User } = require('../models');

var bcrypt = require('bcryptjs');
//Encripta a senha
var cryptPassword = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
   if (err) 
     return callback(err);

   bcrypt.hash(password, salt, function(err, hash) {
     return callback(err, hash);
   });
 });
};
//Testa se as senhas conferem
var comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();

      //return res.json(users);
      return res.render('users', { data: users })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async get(req, res) {
    return res.render('add_user')
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      //Essa função executa, mas a senha é guardada em plain text
      //Colocar o User.create dentro do corpo dessa função retorna um erro
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password=hash;
      });
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      await user.update(req.body);

      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      await user.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();