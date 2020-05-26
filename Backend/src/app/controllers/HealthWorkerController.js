const { Health_Worker } = require('../models');
class Health_WorkerController {
  async list(req, res) {
    try {
      const health_workers = await Health_Worker.findAll();
      return res.json(health_workers);
      //return res.render('health_workers', { data: health_workers })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const health_worker = await Health_Worker.create(req.body);
      return res.json(health_worker);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
        if(!req.session.passport){
            res.status(401).json("Usuário não logado");
          }else if(req.session.passport.user.role==="administrador" || (req.session.passport.user.role==="profissional_saude" && req.session.passport.user.id===req.params.id)){
            Health_Worker.findByPk(req.params.id).then(userToBeUpdated=>{
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
            Health_Worker.findByPk(req.params.id).then(userToBeDestroyedByID=>{
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

module.exports = new Health_WorkerController();