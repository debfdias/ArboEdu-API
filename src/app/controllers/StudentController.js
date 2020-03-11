const { Student } = require('../models');
class StudentController {
  async list(req, res) {
    try {
      const students = await Student.findAll();
      return res.json(students);
      //return res.render('students', { data: students })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const Student = await Student.create(req.body);
      return res.json(Student);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const Student = await Student.findByPk(req.params.id);

      await Student.update(req.body);

      return res.json({ Student });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const Student = await Student.findByPk(req.params.id);
      console.log("FOUND Student: " + req.params.id);
      await Student.destroy();
      console.log("TRYING TO DESTROY");
      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new StudentController();