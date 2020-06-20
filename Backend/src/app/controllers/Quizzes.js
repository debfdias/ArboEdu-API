const { Quiz } = require('../models');
class QuestionsController {
  async list(req, res) {
    try {
      const quizzes = await Quiz.findAll();
      return res.json(quizzes);
      //return res.render('Quiz', { data: Quiz })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      Quiz.create(req.body).then(result=>{
          return res.json(result);
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      Quiz.findByPk(req.params.id).then(questionToBeUpdated=>{
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
      Quiz.findByPk(req.params.id).then(questionToBeDestroyd=>{
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