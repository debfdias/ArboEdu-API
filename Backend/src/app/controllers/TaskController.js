const { Tasks } = require('../models');

class TaskController {
  async index(req, res) {
    try {
      const tasks = await Tasks.findAll();

      return res.json(tasks)
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const task = await Tasks.findByPk(req.params.id);

      return res.json(task);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const task = await Tasks.create(req.body);
      return res.json(task);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const task = await Tasks.findByPk(req.params.id);

      await task.update(req.body);

      return res.json(task);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const task = await Tasks.findByPk(req.params.id);

      await task.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new TaskController();