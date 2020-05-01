const { User } = require('../models');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
require('dotenv').config({path:__dirname+'/./../../../.env'})
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      //return res.json(users);
      return res.render('users', { data: users })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async get(req, res) {
    return res.render('add_user')
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const testCPFUnique = await User.findAll({
        where:{
          cpf: req.body.cpf
        }
      });
      const testEmailUnique = await User.findAll({
        where:{
          email: req.body.email
        }
      });
      if(testCPFUnique.length===0 && testEmailUnique.length===0){
        const user = await User.create(req.body);
        return res.json(user);
      }else{
        return res.status(400).json("CPF ou email já registrados");
      }
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      await user.update(req.body);

      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async authenticate(req, res){
    try {
      const user = await User.findAll({
        where:{
          email: req.body.email
        }
      });
      const userID = await User.findByPk(user[0].dataValues.id);
      const result = await userID.validPassword(req.body.password);
      if(!result){
        res.status(404);
        return res.json("Password or email not found")
      }
      return res.json("Logged in");
    } catch (err) {
      return res.status(404).json("Password or email not found");
    }
  }

  async passwordRecover(req, res){
    try{
      const user = await User.findAll({
        where:{
          email: req.body.email
        }
      });
      if(user===[]){
        return res.status(400).json("Email não encontrado")
      }
      var userID = await User.findByPk(user[0].dataValues.id)
      var temp = {
        resetPasswordToken: crypto.randomBytes(20).toString('hex'),
        resetPasswordExpires: Date.now() + 3600000
      }
      await User.update(temp, { where: { id: userID.id } }).then((result) => {
        if(result[0]===1){
          // send email
        User.findByPk(user[0].dataValues.id).then(userToSendEmailTo=>{
          let link = "http://" + req.headers.host + "/user/" + userToSendEmailTo.id+"/reset/"+userToSendEmailTo.resetPasswordToken;
          const mailOptions = {
              to: userID.email,
              from: 'irs@cin.ufpe.br',
              subject: "Password change request",
              text: `Olá ${userID.name} \n 
          Clique nesse link ${link} para resetar sua senha. \n\n 
          O link é válido por uma hora. \n
          Se não foi você que fez essa solicitação, ignore.\n`,
          };
          
          sgMail.send(mailOptions, (error, result) => {
              if (error) return res.status(500).json({message: error.message});
  
              return res.status(200).json({message: 'Email reset de senha enviado para ' + userID.email + '.'});
          });

        });
        }else{
          return res.status(500).json({message: 'Não foi possível atualizar o resetPasswordToken e resetPasswordExpires para esse usuário. Code: '+result[0]})
        }
      });
    }catch(err){
      return res.status(500).json(err)
    }
  }

  async resetPassword(req, res){
    const user = await User.findAll({
      where:{
        resetPasswordToken: req.params.token
      }
    });
    if(user===[]){
      return res.status(400).json("Email não encontrado")
    }
    if(Date.now()<user[0].resetPasswordExpires.getTime()){
      //ATENÇÂO newPassword é apenas para testes
      //Em produção haverá redirecionamento para o form de redefinição de senha e captura da nova senha ao submeter
      const newPassword="82305235723572"
      var userID = await User.findByPk(user[0].dataValues.id)
      var temp = {
        resetPasswordToken: null,
        resetPasswordExpires: null,
        password: newPassword
      }
      await User.update(temp, { where: { id: userID.id } }).then((result)=>{
        if(result[0]===1){
          return res.status(200).json("Senha alterada com sucesso")
        }else{
          return res.status(500).json({message: "Internal Server Error, code: 1"})
        }
      })
    }else{
      return res.status(404).json("Token expirado")
    }
    return res.status(200).json("OK")
  }

  async test(req, res){
    console.log(req.body);
    req.session.email=req.body.email
    //console.log(req)
    res.status(200).json("Concluído")
    res.end('done')
  }

  async untest(req, res){
    console.log(req.body)
    req.session.destroy((err)=>{
      return console.log(err)
    })
    res.status(200).json("Sessão excluída")
  }
}

module.exports = new UserController();