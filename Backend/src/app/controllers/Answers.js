const { Answers } = require('../models');
class AnswersController {
    async list(req, res) {
        try {
          const answers = await Answers.findAll();
          return res.json(answers);
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      }
    
      async store(req, res) {
        try {
            if(!req.session.passport){
                res.status(401).json("Usuário não logado")
            }else{
                req.body.StudentID=req.session.passport.user.id
                Answers.create(req.body).then(result=>{
                    res.status(200).json("OK")
                })
                
            }
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      }
    
      async update(req, res) {
        try {
          if(!req.session.passport){
            res.status(401).json("Usuário não logado")
          }else{
            const answers = await Answers.findByPk(req.params.id);
            req.body.StudentID=req.session.passport.user.id
            await answers.update(req.body);
            return res.json({ answers });
          }
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      }
    
      async destroy(req, res) {
        try {
            if(!req.session.passport){
                res.status(401).json("Usuário não logado")
            }else{
                const answers = await Answers.findByPk(req.params.id);
                console.log("FOUND Answers: " + req.params.id);
                await answers.destroy();
                console.log("TRYING TO DESTROY");
                return res.json();
            }
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      }
}

module.exports = new AnswersController();