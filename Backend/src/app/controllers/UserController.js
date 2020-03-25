const { User } = require('../models');
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
      console.log("CALLED THIS");
      console.log(req.body);
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
      console.log("FOUND USER: " + req.params.id);
      await user.destroy();
      console.log("TRYING TO DESTROY");
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
      var result = await userID.validPassword(req.body.password);
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();