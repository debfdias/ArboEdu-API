const { Jovem_ACE } = require('../models');
class Jovem_ACEController {
  async list(req, res) {
    try {
      const ACEs = await Jovem_ACE.findAll();
      return res.json(ACEs);
      //return res.render('ACEs', { data: ACEs })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const ACE = await Jovem_ACE.create(req.body);
      return res.json(ACE);
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
        Jovem_ACE.findOne({
          where:{
            UserId: users[0].dataValues.id
          }
        }).then(ACE=>{
          console.log("Checando usuário");
          console.log(req.session.passport);
          
          if(req.session.passport.user.id===ACE.dataValues.UserId){
            console.log("Atualizando");
            console.log(req.body);
            User.findByPk(ACE.dataValues.UserId).then(user=>{
              user.update(req.body).then(ACE=>{
                return res.status(200).json({ ACE });
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
      
      if((role==="jovem_ace" && req.params.id===id)|| role==="administrador"){
        const ACE = await Jovem_ACE.findByPk(req.params.id);
        await ACE.update(req.body);
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
        const ACE = await Jovem_ACE.findByPk(req.params.id);
        console.log("FOUND Jovem_ACE: " + req.params.id);
        await ACE.destroy();
        console.log("TRYING TO DESTROY");
        return res.status(200).json("OK");
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new Jovem_ACEController();