const { Institution } = require('../models');
const { Classes_Institution } = require('../models');

class ClassesInstitutionController {
  async index(req, res) {
    const { idInst, id } = req.params

    try {
      if (id) {
        const classesInstitutions = await Classes_Institution.findAll({ where: { id } })

        return res.render('classesInstitutions', { data: classesInstitutions })
      }

      if (idInst) {
        const classesInstitutions = await Classes_Institution.findAll({ where: { institutionId: idInst } })

        return res.render('classesInstitutions', { data: classesInstitutions })
      }

      const classesInstitutions = await Classes_Institution.findAll();

      return res.render('classesInstitutions', { data: classesInstitutions })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async get(req, res) {
    return res.render('add_classesInstitutions')
  }

  async show(req, res) {
    try {
      const classesInstitution = await Classes_Institution.findByPk(req.params.id);

      return res.json(classesInstitution);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    const instId = req.params.idInst

    try {
      console.log(instId);

      const classesInstitution = await Classes_Institution.create({grade:req.body.grade, class: req.body.class, shift: req.body.shift, institutionId: instId });


      return res.json(classesInstitution);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const classesInstitution = await Classes_Institution.findByPk(req.params.id);

      await classesInstitution.update(req.body);

      return res.json({ classesInstitution });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const classesInstitution = await Classes_Institution.findByPk(req.params.id);

      await classesInstitution.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ClassesInstitutionController();