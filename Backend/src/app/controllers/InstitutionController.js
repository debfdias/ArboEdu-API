const { Institution } = require('../models');

class InstitutionController {
  async get(req, res) {
    try {
      const institutions = await Institution.findAll();

      //return res.render('institutions', { data: institutions })
      return res.json(institutions)
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /* async get(req, res) {
    return res.render('add_institution')
  } */

  async show(req, res) {
    try {
      const institution = await Institution.findByPk(req.params.id);

      return res.json(institution);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const institution = await Institution.create(req.body);
      return res.json(institution);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const institution = await Institution.findByPk(req.params.id);

      await institution.update(req.body);

      return res.json({ institution });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const institution = await Institution.findByPk(req.params.id);

      await institution.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new InstitutionController();