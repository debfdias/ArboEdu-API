/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */
 
module.exports = function(app, passport) {


  app.get('/escola/panel', isLoggedIn, function(req, res) {

    req.getConnection(function (err,connection){
      if(isTeacher(req,res))
      {
        var email = req.user.email;

        connection.query('SELECT * FROM teachers WHERE email = ?', [email], function(err,rows){
          var school_id = rows[0].school_id;
          var principal = rows[0].principal;


          if(principal)
          {
            connection.query('SELECT t.name AS teacher_name, t.id AS teacher_id, t.email, t.phone, t.cpf, t.subject, t.school_id, s.token, s.district_id, s.num_teachers, s.num_students, s.name AS school_name, s.id AS school_id, s.phone AS school_phone FROM teachers t JOIN schools s ON t.school_id = s.id WHERE t.school_id = ?', [school_id], function(err,rows_){
            console.log(rows_)
                if(err)
                {
                   console.log("Error Selecting : %s ", err );
                }
                else
                {
                  connection.query('SELECT * FROM patrono WHERE school_id = ?', [school_id], function(err,rows2){
                     res.render('schoolPanel', {page_title:"sistema - Node.js", user:rows_, data:rows, patrono:rows2});
                  });
                }
            }); 
          }
          else
          {
            console.log("nao autorizado");
            res.redirect('/sistema');
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


  app.get('/patrono/accept/:id',isLoggedIn, function(req, res) {

   var id = req.params.id;

   req.getConnection(function (err, connection) {

     if(!isStudent(req,res)){

            connection.query("SELECT * FROM teachers WHERE id = ? ",[id], function(err, rows)
            {
              var name_teacher = rows[0].name;
              var school_id    = rows[0].school_id;
              connection.query("UPDATE teachers SET patrono = 1 WHERE id = ? ",[id], function(err, rows)
              {
                connection.query("UPDATE teachers SET patrono = 0 WHERE id != ? ",[id], function(err, rows)
                {
                  connection.query("UPDATE patrono SET name = '"+name_teacher+"' WHERE school_id = ? ",[school_id], function(err2, rows)
                  {
                    if(err2)
                      console.log("Error : %s ",err2 );
                    else
                      console.log("professor adicionado como patrono");
                  });
                });
              });
            });

        res.redirect('/escola/panel');
    }
    else
    {
      console.log("apenas admins podem aprovar");
      res.redirect('/sistema');
    }

  });

 });

  app.post('/patrono/cadastro',isLoggedIn, function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));

      req.getConnection(function (err, connection) {
        connection.query("SELECT school_id FROM teachers WHERE email = ? ",[req.user.email], function(err, rows)
        {
            var school_id = rows[0].school_id;

            var data = {
                name        : input.name,
                description : input.description,
                message     : input.message,
                school_id   : school_id

            };

            connection.query("INSERT INTO patrono set ?",[data], function(err,rows1){
              if(err)
                  console.log("Error Selecting : %s ",err );
                else
            console.log("patrono cadastrada");

                res.redirect('/escola/panel');
              });
        });
      });
    });

  app.get('/patrono/edit/:id', function(req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        if(!isStudent(req,res))
        {
          connection.query('SELECT p.id AS patrono_id, p.name AS patrono_name, p.description, p.message FROM patrono p JOIN teachers t ON p.school_id = t.school_id WHERE p.id = ? and (t.patrono = 1 or t.principal = 1)',[id],function(err,rows)
          {
            if(err)
                console.log("Error Selecting : %s ",err );

              res.render('patronoEdit',{page_title:"Edit sistema - Node.js",patrono:rows});
            

          });
        }
        else
        {
          console.log("admins, diretores e patronos editam patrono");
          res.redirect('/sistema');
        }

    });

  });

    app.post('/patrono/edit/:id', function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;

      req.getConnection(function (err, connection) {

        var data = {
            name          : input.name,
            description   : input.description,
            message       : input.message
        };
        console.log(id)

                    connection.query("UPDATE patrono SET ? WHERE id = ? ",[data,id], function(err2, rows) {
                      console.log(rows)
                        if (err2)
                            console.log("Error Updating : %s ",err2 );
                        else
                          console.log("editado patrono por patrono");
                        
                        res.redirect('/sistema');
                      });

        
    
      });

    });

    app.get('/escola/delete/:id', isLoggedIn, function(req, res) {

       var id = req.params.id;

       req.getConnection(function (err, connection) {

          if(isAdmin(req,res)){
            connection.query("DELETE FROM schools  WHERE id = ? ",[id], function(err, rows)
            {
            	if(err)
                    console.log("Error deleting : %s ",err );
                else
                	console.log("escola deletada por admin");
                res.redirect('/sistema');
           });
          }
          else
          {
            console.log("apenas admins podem deletar escola");
            res.redirect('/sistema');
          }
      });

    });

    app.get('/escola/edit/:id', isLoggedIn, function(req, res) {
      var id = req.params.id;

      req.getConnection(function(err,connection){

      	if(!isStudent(req,res))
      	{
	        var query = connection.query('SELECT * FROM schools WHERE id = ?',[id],function(err,rows)
	        {
	         	if(err)
	            	console.log("Error Selecting : %s ",err );

	          	res.render('escolaEdit',{page_title:"Edit sistema - Node.js",school:rows});
	        });
  	    }
  	    else
  	    {
  	    	console.log("admins e profs editam escola");
  	    	res.redirect('/sistema');
  	    }
      }); 
    });

    app.post('/escola/edit/:id', function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;

      req.getConnection(function (err, connection) {

      	var data = {

            name    : input.name,
            token   : input.token,
            address : input.address,
            phone   : input.phone
        };

        if(isAdmin(req,res)) 
        {
        	connection.query("UPDATE schools set ? WHERE id = ? ",[data,id], function(err, rows) {
	          	if (err)
	                console.log("Error Updating : %s ",err );
	            else
	           		console.log("editado escola por admin");

	            res.redirect('/sistema');
          	});
        }
        else if(isTeacher(req,res))
        {
      			connection.query('SELECT * FROM teachers where email=?',[req.user.email],function(err,rows){
      				var school_id = rows[0].school_id;
              var isPrincipal = rows[0].principal;
      				if(school_id == id && isPrincipal == 1)
      				{
      		        	connection.query("UPDATE schools set ? WHERE id = ? ",[data,id], function(err, rows) {
      			          	if (err)
      			                console.log("Error Updating : %s ",err );
      			            else
      			           		console.log("editado escola por prof");
      			            
      			            res.redirect('/sistema');
      		          	});
      				}
      				else
      				{
      					console.log("voce nao eh prof dessa escola ou nao eh diretor para editar");
      					res.redirect('/sistema');
      				}

          	});
        }
    
      });

    });

    app.get('/escola/cadastro', isLoggedIn, function(req, res) {

      	req.getConnection(function(err,connection){
        
          if(isAdmin(req,res))
          {
            var query = connection.query('SELECT * FROM states', function(err,rows)
            {
              if(err)
                console.log("Error Selecting : %s ",err );

              var query = connection.query('SELECT * FROM districts', function(err,rows2)
              {

                res.render('cadastroEscola',{page_title:"escola - Node.js",state:rows, district:rows2});
              });

            });
          }
          else
          {
            console.log("voce nao pode cadastrar escola");
            res.redirect('/sistema');
          }
      });
    });

    app.post('/escola/cadastro', function(req, res) {

	    var input = JSON.parse(JSON.stringify(req.body));

	    req.getConnection(function (err, connection) {

		    var data = {

	            name     : input.name,
	            city_id  : 1,
	            state_id : input.stateId,
              district_id : input.districtId,
	            points   : 0,
	            token    : 'null',
              num_students : 0,
              num_teachers : 0,
              address      : input.address,
              phone        : input.phone

	        };

          if(isTeacher(req,res))
            data.num_teachers++;

	        	connection.query("INSERT INTO schools set ?",[data], function(err,rows1){
	        		if(err)
            			console.log("Error Selecting : %s ",err );
            		else
						console.log("escola cadastrada");

            		res.redirect('/sistema');
            	});

	    });
    });


    app.get('/escola/:id', isLoggedIn, function(req, res) {

    	var id = req.params.id;
      	req.getConnection(function(err,connection){

        connection.query('SELECT * FROM states', function(err,rows_)
        {
          connection.query('SELECT * FROM schools where id=?', [id], function(err,rows)
          {
            if(err)
              console.log("Error Selecting : %s ",err );

            res.render('escola',{page_title:"escola - Node.js",school:rows, state:rows_});

          });
        });
      });
    });

    app.get('/escolas/:id', isLoggedIn, function(req, res) {

      var id = req.params.id;
        req.getConnection(function(err,connection){

        connection.query('SELECT * FROM states', function(err,rows_)
        {
          connection.query('SELECT * FROM schools where id=?', [id], function(err,rows)
          {
            if(err)
              console.log("Error Selecting : %s ",err );

            res.render('escola',{page_title:"escola - Node.js",school:rows, state:rows_});

          });
        });
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

    function isStudent(req,res)
    {
      if(req.user.type == 1)
        return true;
      else
        return false;
    }

    function isTeacher(req,res)
    {
      if (req.user.type == 2)
        return true;
      else
        return false;
    }

    function isAdmin (req,res) 
    {
      if (req.user.type == 0)
        return true;
      else
        return false;
    }

}