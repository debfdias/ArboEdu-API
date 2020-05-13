const { EducationWorker } = require('../models');
class EducationWorkerController {
  async list(req, res) {
    try {
      const education_workers = await EducationWorker.findAll();
      return res.json(education_workers);
      //return res.render('education_workers', { data: education_workers })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const education_worker = await EducationWorker.create(req.body);
      return res.json(education_worker);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
        if(!req.session.passport){
            res.status(401).json("Usuário não logado");
          }else if(req.session.passport.user.role==="administrador"){
            EducationWorker.findByPk(req.params.id).then(userToBeUpdated=>{
              userToBeUpdated.update(req.body).then(result=>{
                console.log(result);
                res.status(200).json("OK")
              })
            });
          }else{
            res.status(401).json("Usuário não é administrador")
          }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
        if(!req.session.passport){
            res.status(401).json("Usuário não logado");
          }else if(req.session.passport.user.role==="administrador"){
            EducationWorker.findByPk(req.params.id).then(userToBeDestroyedByID=>{
              userToBeDestroyedByID.destroy().then(result=>{
                return res.status(200).json("OK");
              });
            });
          }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new EducationWorkerController();