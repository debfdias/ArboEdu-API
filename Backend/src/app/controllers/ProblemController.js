const { Problem } = require('../models');
class ProblemController {
  async list(req, res) {
    try {
      const problems = await Problem.findAll();
      return res.json(problems);
      //return res.render('problems', { data: problems })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      req.body.status='PENDENTE'
      console.log(req.body);
      await Problem.create(req.body).then(result=>{
          return res.json(result);
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const problem = await Problem.findByPk(req.params.id);

      await problem.update(req.body);

      return res.status(200).json({ problem });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const problem = await Problem.findByPk(req.params.id);
      console.log("FOUND Problem: " + req.params.id);
      await problem.destroy();
      console.log("TRYING TO DESTROY");
      return res.status(200).json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ProblemController();