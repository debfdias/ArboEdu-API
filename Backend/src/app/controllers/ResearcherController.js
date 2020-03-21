const { Researcher } = require('../models');
class ResearcherController {
  async list(req, res) {
    try {
      const researchers = await Researcher.findAll();
      return res.json(researchers);
      //return res.render('researchers', { data: researchers })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const researcher = await Researcher.create(req.body);
      return res.json(researcher);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const researcher = await Researcher.findByPk(req.params.id);

      await researcher.update(req.body);

      return res.json({ researcher });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const researcher = await Researcher.findByPk(req.params.id);
      console.log("FOUND Researcher: " + req.params.id);
      await researcher.destroy();
      console.log("TRYING TO DESTROY");
      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ResearcherController();