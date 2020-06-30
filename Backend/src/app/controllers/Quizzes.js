const { Quiz, Questions, Quiz_Questions } = require('../models');
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
      Quiz.create(req.body).then(quizzes=>{
          quizzes.list_questions.forEach(questionId => {
            Questions.findByPk(questionId).then(questionToBeAdded=>{
              if(questionToBeAdded!==null){
                Quiz_Questions.create({
                  QuizId: quizzes.dataValues.id,
                  QuestionId: questionId
                })
              }
            })
          });
          return res.status(200).json("OK")
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