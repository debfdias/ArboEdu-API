const { Researcher } = require('../models');
class ResearcherController {
  async list(req, res) {
    try {
      const researchers = await Researcher.findAll();
      return res.json(researchers);
      //return res.render('researchers', { data: researchers })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const researcher = await Researcher.create(req.body);
      return res.json(researcher);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /* async update(req, res) {
    try {
      //Procurando usuário com esse email
      User.findAll({
        where:{
          email: req.params.email
        }
      }).then(users=>{
        //Procurando pes
        Researcher.findOne({
          where:{
            UserId: users[0].dataValues.id
          }
        }).then(researcher=>{
          console.log("Checando usuário");
          console.log(req.session.passport);
          
          if(req.session.passport.user.id===researcher.dataValues.UserId){
            console.log("Atualizando");
            console.log(req.body);
            User.findByPk(researcher.dataValues.UserId).then(user=>{
              user.update(req.body).then(researcher=>{
                return res.status(200).json({ researcher });
              })
            })
          }else{
            return res.status(400).json("Não autorizado")
          }
        });

      });
      return res.status(404).json("Não encontrado esse usuário.")

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } */
  async update(req, res) {
    try {
      if(!req.session.passport){
        res.status(401).json("Usuário não logado");
      }else if(req.session.passport.user.role==="administrador" || (req.session.passport.user.role==="pesquisador" && req.session.passport.user.id===req.params.id)){
        Researcher.findByPk(req.params.id).then(userToBeUpdated=>{
          userToBeUpdated.update(req.body).then(result=>{
            console.log(result);
            res.status(200).json("OK")
          })
        });
      }else{
        res.status(401).json("Usuário não autorizado para essa transação")
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
        Researcher.findByPk(req.params.id).then(userToBeDestroyedByID=>{
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

module.exports = new ResearcherController();