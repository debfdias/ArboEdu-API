const { User } = require('../app/models');
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
                console.log(req.session)
                if(user===undefined){
                    return done(null, false,{
                        message: "Usuário não encontrado"
                    })
                }
                if(!user.validPassword(password)){
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }else{
                    return done(null, user)
                }
            })
        }
     
    ));
}