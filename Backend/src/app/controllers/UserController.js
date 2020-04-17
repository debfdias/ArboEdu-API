const { User } = require('../models');
const crypto = require('crypto');
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
      const testCPFUnique = await User.findAll({
        where:{
          cpf: req.body.cpf
        }
      });
      const testEmailUnique = await User.findAll({
        where:{
          email: req.body.email
        }
      });
      if(testCPFUnique.length===0 && testEmailUnique.length===0){
        const user = await User.create(req.body);
        return res.json(user);
      }else{
        return res.status(400).json("CPF ou email já registrados");
      }
    } catch (err) {
      return res.status(400).json(err.message);
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

  async authenticate(req, res){
    try {
      const user = await User.findAll({
        where:{
          email: req.body.email
        }
      });
      const userID = await User.findByPk(user[0].dataValues.id);
      const result = await userID.validPassword(req.body.password);
      if(!result){
        res.status(404);
        return res.json("Password or email not found")
      }
      return res.json("Logged in");
    } catch (err) {
      return res.status(404).json("Password or email not found");
    }
  }

  async passwordRecover(req, res){
    try{
      const user = await User.findAll({
        where:{
          email: req.body.email
        }
      });
      var userID = await User.findByPk(user[0].dataValues.id)
      var temp = {
        resetPasswordToken: crypto.randomBytes(20).toString('hex'),
        resetPasswordExpires: Date.now() + 3600000
      }
      User.update(temp, { where: { id: userID.id } }).then((result) => {});
      userID = await User.findByPk(user[0].dataValues.id)
      return res.json(userID)
    }catch(err){
      return res.status(404).json(err)
    }
  }
}

module.exports = new UserController();