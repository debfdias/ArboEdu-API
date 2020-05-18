const { Administrator } = require('../models');
class AdministratorController {
  async list(req, res) {
    try {
      const Administrators = await Administrator.findAll();
      return res.json(Administrators);
      //return res.render('Administrators', { data: Administrators })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const Administrator = await Administrator.create(req.body);
      return res.json(Administrator);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const Administrator = await Administrator.findByPk(req.params.id);

      await Administrator.update(req.body);

      return res.json({ Administrator });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const Administrator = await Administrator.findByPk(req.params.id);
      console.log("FOUND Administrator: " + req.params.id);
      await Administrator.destroy();
      console.log("TRYING TO DESTROY");
      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AdministratorController();