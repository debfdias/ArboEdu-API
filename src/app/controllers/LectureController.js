const { Lectures } = require('../models');

class LectureController {
  async list(req, res) {
    try {
      const lectures = await Lectures.findAll();

      return res.json(lectures);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const lecture = await Lectures.findByPk(req.params.id);

      return res.json(lecture);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const lecture = await Lectures.create(req.body);
      return res.json(lecture);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const lecture = await Lectures.findByPk(req.params.id);

      await lecture.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new LectureController();