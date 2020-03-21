/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

var LocalStrategy   = require('passport-local').Strategy;
//var bcrypt = require('bcrypt-nodejs');//used to encrypt your passwords
var pool = require('./mysql').pool; 
//var moment = require('moment'); 

var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100,
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'b87ad073f0d63d',
    password : '2d8c7b6b',
    database : 'heroku_77659378f7bfef1',
    debug : 'false'
});




// expose this function to app using module.exports
module.exports = function(passport, parameters) {


  const minutesLocked = parameters.minutesLocked; 

      passport.serializeUser(function(user,done) {
  		done(null, user.id);
      });

      //auth user
      passport.deserializeUser(function(id,done) {
        pool.getConnection(function(err, connection){
          connection.query("select * from users where id = ?",[id],function(err,rows){
            if(err){
              connection.release();
              done(null,false);
            }
            else{
              connection.release();
        			done(err, rows[0]);
            }
          });

        });

      });


    passport.use('local-signup-prof', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function(){
          const input = req.body;//JSON.parse(JSON.stringify(req.body));

          if(input.confirm!=input.password)
          {
            console.log("Senhas diferentes");
            return done(null, false, req.flash('registerMessage', 'Passwords are not matching.'));
          }

          req.getConnection(function(err, connection){
            connection.query("select * from users where email = ?",[input.email],function(err,rows){
              if (err)
              {
                connection.release();
                return done(err);
              }

      			  if (rows.length>0) {
                console.log("Email ja usado");
                connection.release();
                return done(null, false, req.flash('registerMessage', 'Email já usado'));
              }
              else {

                const newUserMysql = new Object();
                newUserMysql.username = input.name;
                newUserMysql.address  = input.address;
                newUserMysql.birth    = input.birth;
                newUserMysql.phone    = input.phone;
                newUserMysql.cpf      = input.cpf;
                newUserMysql.schoolId = input.schoolId;
                newUserMysql.subject  = input.subject;
                newUserMysql.password = input.password; 
                newUserMysql.email    = input.email; 
                newUserMysql.auth     = 0;
                newUserMysql.type     = 2;
                newUserMysql.principal= 0;


                const insertUser = "insert into users (name, email, password, auth, type) values (?,?,?,?,?)";
                connection.query(insertUser,[newUserMysql.username, newUserMysql.email, newUserMysql.password, newUserMysql.auth, newUserMysql.type],function(err,result){
                  if (err)
                  {
                    connection.release();
                    return done(err);
                  }

                  newUserMysql.id = result.insertId;
                  console.log("deu bom");
                  connection.release();
                  return done(null, newUserMysql);
                });

                const insertTeacher = "insert into teachers (name, address, birth, phone, cpf, school_id, subject, email, password, principal) values (?,?,?,?,?,?,?,?,?,?)";
                connection.query(insertTeacher,[newUserMysql.username, newUserMysql.address, newUserMysql.birth, 
                  newUserMysql.phone, newUserMysql.cpf, newUserMysql.schoolId, newUserMysql.subject, newUserMysql.email, newUserMysql.password,newUserMysql.principal],function(err,result){
                  if (err)
                  {
                    connection.release();
                    return done(err);
                  }
                  console.log("deu bom pro prof");
                });


              }

            });

          });

		    });
      }));

  passport.use('local-signup-asinha', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function(){
          const input = req.body;//JSON.parse(JSON.stringify(req.body));

          if(input.confirm!=input.password)
          {
            console.log("Senhas diferentes");
            return done(null, false, req.flash('registerMessage', 'Passwords are not matching.'));
          }

          req.getConnection(function(err, connection){
            connection.query("select * from users where email = ?",[input.email],function(err,rows){
              if (err)
              {
                connection.release();
                return done(err);
              }

              if (rows.length>0) {
                console.log("Email ja usado");
                connection.release();
                return done(null, false, req.flash('registerMessage', 'Email já usado'));
              }
              else {

                const newUserMysql = new Object();
                newUserMysql.username = input.name;
                newUserMysql.address  = input.address;
                newUserMysql.phone    = input.phone;
                newUserMysql.cpf      = input.cpf;
                newUserMysql.schoolId = input.schoolId;
                newUserMysql.district = input.district;
                newUserMysql.password = input.password; 
                newUserMysql.email    = input.email; 
                newUserMysql.auth     = 0;
                newUserMysql.type     = 3;

                const insertAsinha = "insert into asinhas (name, address, cpf,  phone, school_id, district_id, email, password) values (?,?,?,?,?,?,?,?)";
                connection.query(insertAsinha,[newUserMysql.username, newUserMysql.address,newUserMysql.cpf, newUserMysql.phone,  newUserMysql.schoolId, newUserMysql.district, newUserMysql.email, newUserMysql.password],function(err,result){
                  if (err)
                  {
                    connection.release();
                    return done(err);
                  }
                  console.log("deu bom pro asinha");
                });


                const insertUser = "insert into users (name, email, password, auth, type) values (?,?,?,?,?)";
                connection.query(insertUser,[newUserMysql.username, newUserMysql.email, newUserMysql.password, newUserMysql.auth, newUserMysql.type],function(err,result){
                  if (err)
                  {
                    connection.release();
                    return done(err);
                  }

                  newUserMysql.id = result.insertId;
                  console.log("deu bom");
                  connection.release();
                  return done(null, newUserMysql);
                });


              }

            });

          });

        });
      }));


    passport.use('local-signup-std', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function(){
          const input = req.body;//JSON.parse(JSON.stringify(req.body));

          if(input.confirm!=input.password)
          {
            console.log("Senhas diferentes");
            return done(null, false, req.flash('registerMessage', 'Passwords are not matching.'));
          }

          req.getConnection(function(err, connection){
            connection.query("select * from users where email = ?",[input.email],function(err,rows){
              if (err)
              {
                connection.release();
                return done(err);
              }

              if (rows.length>0) {
                console.log("Email ja usado");
                connection.release();
                return done(null, false, req.flash('registerMessage', 'Email já usado'));
              }
              else {

                const newUserMysql = new Object();
                newUserMysql.username = input.name;
                newUserMysql.address  = input.address;
                newUserMysql.birth    = input.birth;
                newUserMysql.phone    = input.phone;
                newUserMysql.cpf      = input.cpf;
                newUserMysql.schoolId = input.schoolId;
                newUserMysql.token    = input.token;
                newUserMysql.year     = input.year;
                newUserMysql.nameFml  = input.nameFml;
                newUserMysql.cpfFml   = input.cpfFml;
                newUserMysql.ncCelpe  = input.ncCelpe;
                newUserMysql.password = input.password; 
                newUserMysql.email    = input.email; 
                newUserMysql.auth     = 1;
                newUserMysql.type     = 1;
                newUserMysql.points   = 0;
                newUserMysql.activityId = 0;

                pool.getConnection(function(err, connection){
                  connection.query("select * from schools where id = ?",[newUserMysql.schoolId],function(err,rows){
                      if (err)
                      {
                        connection.release();
                        return done(err);
                      }

                      const storedtoken = rows[0].token;

                      if ( input.token !== storedtoken )
                      {
                        //if the password is incorrect then we record the failure attempt in the database below
                        console.log("Token errada - cadastro nao realizado!");
                        return done(null, false, req.flash('loginMessage', 'Token errado'));

                      }
                      else {
                          const insertUser = "insert into users (name, email, password, auth, type) values (?,?,?,?,?)";
                          connection.query(insertUser,[newUserMysql.username, newUserMysql.email, newUserMysql.password, newUserMysql.auth, newUserMysql.type],function(err,result){
                            if (err)
                            {
                              connection.release();
                              return done(err);
                            }

                            newUserMysql.id = result.insertId;
                            console.log("deu bom");
                            connection.release();
                            return done(null, newUserMysql);
                          });

                          const insertStudent = "insert into students (name, address, birth, phone, cpf, school_id, token, year, name_family, cpf_family, nc_celpe, email, password, points, current_act) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                          connection.query(insertStudent,[newUserMysql.username, newUserMysql.address, newUserMysql.birth, 
                            newUserMysql.phone, newUserMysql.cpf, newUserMysql.schoolId, newUserMysql.token, 
                            newUserMysql.year, newUserMysql.nameFml, newUserMysql.cpfFml, newUserMysql.ncCelpe, 
                            newUserMysql.email, newUserMysql.password, newUserMysql.points, newUserMysql.activityId],function(err,result){
                            if (err)
                            {
                              connection.release();
                              return done(err);
                            }
                              connection.query("UPDATE schools SET num_students = num_students+1 WHERE id = ? ",[newUserMysql.schoolId], function(err, rows)
                              {
                                  console.log("deu bom pro stu");

                              });

                            
                          });
                    
                      }
                  });

              });

              }

            });

          });

        });
      }));

/*
    function calculateMinutes(startDate,endDate)
    {
       var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
       var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
       var duration = moment.duration(end_date.diff(start_date));
       var minutes = duration.asMinutes();
       return minutes;
    }*/

    passport.use('local-login', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, name, password, done) { // callback with username and password from our form
        process.nextTick(function(){
          const input = req.body;//JSON.parse(JSON.stringify(req.body));

          const data = {
              password : input.password,
              email    : input.email
          };
          
          const ipaddress = req.ip;

          pool.getConnection(function(err, connection){
              connection.query("select * from users where email = ?",[data.email],function(err,rows){
                  if (err)
                  {
                    connection.release();
                    return done(err);
                  }

                  if (!rows.length) {
                    console.log("Nao encontrado");
                    connection.release();
                    return done(null, false, req.flash('loginMessage', 'Inexistente')); 
                  }

                  const storedpassword = rows[0].password;

                  if ( data.password !== storedpassword )
                  {
                    //if the password is incorrect then we record the failure attempt in the database below
                    console.log("Senha errada");
                    return done(null, false, req.flash('loginMessage', 'Senha errada'));

                  }
                  else {

                    const hasAuth = rows[0].auth;
                    if (hasAuth == 1)
                    {
                        console.log("hello,user has logged in");
                        connection.release();
                        return done(null, rows[0]);
                    }
                    else
                    {
                      console.log("Sem autorizacao");
                      return done(null, false, req.flash('loginMessage', 'Sem autorizacao'));
                    }
                
                  }
              });

    		  });

        });

      }));

};
