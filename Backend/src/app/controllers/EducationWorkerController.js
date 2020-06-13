const { Education_Worker } = require('../models');
class Education_WorkerController {
  async list(req, res) {
    try {
      const education_workers = await Education_Worker.findAll();
      return res.json(education_workers);
      //return res.render('education_workers', { data: education_workers })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const education_worker = await Education_Worker.create(req.body);
      return res.json(education_worker);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
        Education_Worker.findByPk(req.params.id).then(result=>{
          const UserId = result.dataValues.UserId
          if(!req.session.passport){
              res.status(401).json("Usuário não logado");
            }else if(req.session.passport.user.role==="administrador" || (req.session.passport.user.role==="profissional_educacao" && req.session.passport.user.id===UserId)){
              Education_Worker.findByPk(req.params.id).then(userToBeUpdated=>{
                userToBeUpdated.update(req.body).then(result=>{
                  console.log(result);
                  res.status(200).json("OK")
                })
              });
            }else{
              res.status(401).json("Usuário não é administrador OU não é dono dos dados em questão")
            }
        })
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      console.log(req.session);
      console.log("====================");
      console.log(req.params);
        if(!req.session.passport){
          res.status(401).json("Usuário não logado");
        }else if(req.session.passport.user.role==="administrador"){
          Education_Worker.findByPk(req.params.id).then(userToBeDestroyedByID=>{
            userToBeDestroyedByID.destroy().then(result=>{
              return res.status(200).json("OK");
            });
          });
        }else{
          res.status(401).json("Usuário não é administrador")
        }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new Education_WorkerController();