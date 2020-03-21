/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

 module.exports = function(app, passport) {

 	app.get('/admin/pendentes', isLoggedIn, function(req, res) {
 		req.getConnection(function (err,connection){
 			if(isAdmin(req,res))
 			{
 				connection.query('SELECT * FROM users WHERE auth = ? and (type = ? or ?)', [0, 2, 3], function(err,rows_){
         var email  = '';

         if(rows_.length>0)
         {
             for(var i=0; i<rows_.length;i++)
             {
                email += "'" + rows_[i].email+ "',";
             }

             email = email.substring(0,email.length-1);

        
             connection.query('SELECT t.name AS teacher_name, t.email, t.phone, t.cpf, t.subject, s.name AS school_name FROM teachers t JOIN schools s ON t.school_id = s.id WHERE email IN (' + email + ')', function(err,rows){
               connection.query('SELECT * FROM asinhas a JOIN users u ON a.email = u.email WHERE u.auth = ? ', [0], function(err,rows3){
                  if(err)
                  {
                    console.log("Error Selecting : %s ", err );
                  }
                  else
                  {
                        res.render('adminPanel', {page_title:"sistema - Node.js", user:rows_, data:rows, asinha:rows3});
                     
                  }
                  });

              });
          }
          else
          {
            res.render('adminPanel', {page_title:"sistema - Node.js", user:rows_});
          }
        });      
      }
 			else
 			{
 				console.log("nao autorizado");
 				res.redirect('/sistema');
 			}
 		});

 	});

  app.get('/admin/refuse/:id', isLoggedIn, function(req, res) {

   var id = req.params.id;

   req.getConnection(function (err, connection) {

    connection.query('SELECT * FROM users where id=?',[id],function(err,rows){
      var email = rows[0].email;
      var type  = rows[0].type;

      if(isAdmin(req,res)){
        connection.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows)
        {
          if(type==2)
          {
            connection.query("DELETE FROM teachers  WHERE email = ? ",[email], function(err, rows)
            {
             if(err)
               console.log("Error deleting : %s ",err );
             else
               console.log("professor recusado");

             res.redirect('/sistema');
           });
          }
          else if(type==3)
          {
            connection.query("DELETE FROM asinhas WHERE email = ? ",[email], function(err, rows)
            {
             if(err)
               console.log("Error deleting : %s ",err );
             else
               console.log("asinha recusado");

             res.redirect('/sistema');
           });
          }
        });
      }
      else
      {
        console.log("apenas admins podem recusar");
        res.redirect('sistema');
      }
    });
  });

 });

  app.get('/admin/accept/:id',isLoggedIn, function(req, res) {

   var id = req.params.id;

   req.getConnection(function (err, connection) {

     if(isAdmin(req,res)){
      connection.query("SELECT * from users WHERE id = ? ",[id], function(err, rows)
      {
        var email = rows[0].email;
        var type  = rows[0].type;

        if(type==2)
        {
          connection.query("SELECT * FROM teachers WHERE email = ? ",[email], function(err2, rows2)
          {
            if(err2)
              console.log("Error deleting : %s ",err2 );

            var school_id = rows2[0].school_id;

                connection.query("UPDATE schools SET num_teachers = num_teachers+1 WHERE id = ? ",[school_id], function(err, rows)
                {

                  connection.query("UPDATE users SET auth = 1 WHERE id = ? ",[id], function(err, rows)
                  {
                    if(err)
                      console.log("Error deleting : %s ",err );
                    else
                      console.log("professor aprovado e adicionado na escola");

                  });

                });

            });
        }
        else if(type==3)
        {
          connection.query("SELECT * FROM asinhas WHERE email = ? ",[email], function(err2, rows2)
          {
            if(err2)
              console.log("Error deleting : %s ",err2 );

                  connection.query("UPDATE users SET auth = 1 WHERE id = ? ",[id], function(err, rows)
                  {
                    if(err)
                      console.log("Error deleting : %s ",err );
                    else
                      console.log("asinha aprovado");

                  });

            });

        }

        res.redirect('/sistema');
      });
    }
    else
    {
      console.log("apenas admins podem aprovar");
      res.redirect('/sistema');
    }

  });

 });

  app.get('/admin/accept_p/:id',isLoggedIn, function(req, res) {

   var id = req.params.id;

   req.getConnection(function (err, connection) {

     if(isAdmin(req,res)){
      connection.query("SELECT * from users WHERE id = ? ",[id], function(err, rows)
      {
        var email = rows[0].email;
        connection.query("SELECT * FROM teachers WHERE email = ? ",[email], function(err2, rows2)
        {
          if(err2)
            console.log("Error  : %s ",err2 );

          var school_id = rows2[0].school_id;

              connection.query("UPDATE schools SET num_teachers = num_teachers+1 WHERE id = ? ",[school_id], function(err, rows)
              {

                connection.query("UPDATE users SET auth = 1 WHERE id = ? ",[id], function(err, rows)
                {
                  connection.query("UPDATE teachers SET principal = 1 WHERE email = ? ",[email], function(err, rows)
                  {
                    if(err)
                      console.log("Error updating : %s ",err );
                    else
                      console.log("diretor aprovado e adicionado na escola");
                  });

                });

              });

          });

        res.redirect('/sistema');
      });
    }
    else
    {
      console.log("apenas admins podem aprovar");
      res.redirect('/sistema');
    }

  });

 });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

  function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
      return next();
    res.redirect('/sistema');
  }

  function isAdmin (req,res) 
  {
    if (req.user.type == 0)
      return true;
    else
      return false;
  }

}