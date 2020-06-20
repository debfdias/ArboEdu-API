const { Questions } = require('../models');
class QuestionsController {
  async list(req, res) {
    try {
      const questions = await Questions.findAll();
      return res.json(questions);
      //return res.render('Questions', { data: Questions })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      Questions.create(req.body).then(result=>{
          return res.json(result);
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      Questions.findByPk(req.params.id).then(questionToBeUpdated=>{
          questionToBeUpdated.update(req.body).then(result=>{
              console.log(result);
              res.status(200).json(result);
          });
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      Questions.findByPk(req.params.id).then(questionToBeDestroyd=>{
        questionToBeDestroyd.destroy().then(result=>{
            res.status(200).json(result);
        })
      })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new QuestionsController();