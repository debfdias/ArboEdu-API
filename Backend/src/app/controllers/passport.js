const { User } = require('../models');
module.exports = function(passport, user, LocalStrategy) {
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true 
        },function(req, email, password, done) {
            User.findAll({
                where:{
                    email: email
                }
            }).then(users=>{                
                var user=users[0];
                if(user===undefined){
                    console.log("Usuário não encontrado");
                    return done(null, false,{
                        message: "Usuário não encontrado"
                    })
                }
                user.validPassword(password).then(result=>{
                    if(!result){
                        console.log("Senha incorreta");
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }else{
                        console.log("Logado!");
                        return done(null, user)
                    }
                    
                })
                
            })
        }
     
    ));
}

module.exports.logout = function(req, res) {
    //console.log('Apagando sessão')
    //console.log(req.session)
    req.session.destroy(function(err) {
        console.log('Sessão apagada')
        res.status(200).json("Logged out")
    });
}