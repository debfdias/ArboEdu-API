const { User } = require('../models');
module.exports = function(passport, user, CookieStrategy) {
    var CookieStrategy = require('passport-local').Strategy;
    passport.use('local-signin', new CookieStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true 
        },function(req, email, password, done) {
            User.findAll({
                where:{
                    lastCookie: req.headers.cookie
                }
            }).then(userByCookie=>{
                //Usuário sem cookie
                if(userByCookie.length===0){
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
                                user.lastCookie=req.headers.cookie
                                user.save()
                                console.log("Logado!");
                                return done(null, user)
                            }
                            
                        })
                        
                    })
                //Usuário com cookie válido
                }else{
                    console.log(userByCookie[0].lastCookie);
                    console.log("Logado!");
                    return done(null, userByCookie[0])
                }
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