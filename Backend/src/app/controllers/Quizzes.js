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
          questionToBeUpdated.update(req.body).then(quizzes=>{
            Quiz_Questions.findAll({where:{
              QuizId: req.params.id
            }}).then(found=>{
              //====================================================================
              //Para atualizar tabelas relacionadas com adição
              var questionsOnDatabase=[]
              found.forEach(element=>{
                questionsOnDatabase.push(element.dataValues.QuestionId)
              })
              req.body.list_questions.forEach(element=>{
                if(!questionsOnDatabase.includes(element)){
                  Quiz_Questions.create({
                    QuizId: req.params.id,
                    QuestionId: element
                  }).then().catch(err=>{res.status(500).json("Não foi possível acrescentar uma ou mais questões.", err)})
                }
              })
              //====================================================================
              //Para atualizar tabelas relacionadas com exclusão
              var questionsOnRequisition=[]
              req.body.list_questions.forEach(element=>{
                questionsOnRequisition.push(element)
              })
              found.forEach(element=>{
                if(!questionsOnRequisition.includes(element.dataValues.QuestionId)){
                  element.destroy().then().catch(err=>{res.status(500).json("Erro ao remover uma ou mais questões.", err)})
                }
              })
            })
            
            res.status(200).json("OK");
          });
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      Quiz.findByPk(req.params.id).then(questionToBeDestroyed=>{
        questionToBeDestroyed.destroy().then(result=>{
            res.status(200).json(result);
        })
      })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new QuestionsController();