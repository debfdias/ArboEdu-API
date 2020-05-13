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
      var role = "";
      var id="";
      if(req.session.passport===undefined){
        return res.status(401).json("Usuário não logado")
      }else{
        role = req.session.passport.user.role;
        id= req.session.passport.user.id
      } 
      
      if((role==="pesquisador" && req.params.id===id)|| role==="administrador"){
        const researcher = await Researcher.findByPk(req.params.id);
        await researcher.update(req.body);
        return res.status(200).json("OK");
      }else{
        return res.status(401).json("Usuário não autorizado para essa transação.")
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      if(!req.session.passport){
        res.status(401).json("Usuário não logado")
      }else if(req.session.passport.user.role!=="administrador"){
        res.status(401).json("Não é administrador")
      }else{
        const researcher = await Researcher.findByPk(req.params.id);
        console.log("FOUND Researcher: " + req.params.id);
        await researcher.destroy();
        console.log("TRYING TO DESTROY");
        return res.status(200).json("OK");
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ResearcherController();