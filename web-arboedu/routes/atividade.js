/**
 * ZikaWEB
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

module.exports = function(app, passport) {

    app.get('/atividade/delete/:id', isLoggedIn, function(req, res) {

       var id = req.params.id;

       req.getConnection(function (err, connection) {

          if(isAdmin(req,res)){
            connection.query("DELETE FROM activities WHERE id = ? ",[id], function(err, rows)
            {
            	if(err)
                    console.log("Error deleting : %s ",err );
                else
                	console.log("atividade deletado por admin");
                res.redirect('/sistema');
           });
          }
          else
          {
            console.log("apenas admins podem deletar atividades");
            res.redirect('/sistema');
          }
      });

    });

    app.get('/atividade/edit/:id', isLoggedIn, function(req, res) {
      var id = req.params.id;

      req.getConnection(function(err,connection){

      	if(isAdmin(req,res))
      	{
	        var query = connection.query('SELECT * FROM activities WHERE id = ?',[id],function(err,rows)
	        {
	         	if(err)
  	         {
              console.log("Error Selecting : %s ",err );
             }

              res.render('atividadeEdit',{page_title:"Edit sistema - Node.js",data:rows});
	        });
  	    }
  	    else
  	    {
  	    	console.log("admins editam atividades");
  	    	res.redirect('/sistema');
  	    }
      });
    });

    app.post('/atividade/edit/:id', function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;

      req.getConnection(function (err, connection) {

      	var data = {

            name          : input.name,
            description   : input.description,
            points        : input.points
        };

        if(isAdmin(req,res))
        {
        	connection.query("UPDATE activities set ? WHERE id = ? ",[data,id], function(err, rows) {
	          	if (err)
	                console.log("Error Updating : %s ",err );
	            else
	           		console.log("editado atividade por admin");

	            res.redirect('/sistema');
          	});
        }
        else
        {
        	console.log("sem permissao para editar atividade");
        	res.redirect('/sistema');

        }
      });

    });

    app.get('/atividade/cadastro', isLoggedIn, function(req, res) {

      	req.getConnection(function(err,connection){

	        if(isAdmin(req,res))
	        {
              res.render('cadastroAtividade',{page_title:"ZikaWEB "});
	        }
	        else
	        {
	            console.log("voce nao pode cadastrar atividade");
	            res.redirect('/sistema');
	        }
      });
    });

    app.post('/atividade/cadastro', function(req, res) {

	    var input = JSON.parse(JSON.stringify(req.body));

	    req.getConnection(function (err, connection) {

		    var data = {

	            name         : input.name,
	            description  : input.description,
	            points       : input.points,
	            active       : 0

	        };

	        connection.query("INSERT INTO activities set ?",[data], function(err,rows){
	        	if(err)
            		console.log("Error inserting : %s ",err );
            	else
					console.log("atividade cadastrado");

            	res.redirect('/sistema');
            });

	    });
    });

  app.get('/atividade/activate/:id', isLoggedIn, function(req, res) {

	   var id = req.params.id;

	   req.getConnection(function (err, connection) {

		   	if(isAdmin(req,res))
		   	{
		   		connection.query('UPDATE  activities SET active = 1 WHERE id = ?',[id],function(err,rows){
		   			if(err)
		   				console.log("problema em ativar");
		   			else
		   				console.log("atividade ativada")
		   			res.redirect('/sistema');

			    });
		   	}
		   	else
		   	{
		   		console.log("sem permissao para mexer em atividade");
		   		res.redirect('/sistema');
		   	}
		});
	});

    app.get('/atividade/deactivate/:id', isLoggedIn, function(req, res) {

	   var id = req.params.id;

	   req.getConnection(function (err, connection) {

		   	if(isAdmin(req,res))
		   	{
		   		connection.query('UPDATE  activities SET active = 0 WHERE id = ?',[id],function(err,rows){
		   			if(err)
		   				console.log("problema em ativar");
		   			else
		   				console.log("atividade desativada");

		   			res.redirect('/sistema');

			    });
		   	}
		   	else
		   	{
		   		console.log("sem permissao para mexer em atividade");
		   		res.redirect('/sistema');
		   	}
		});
	});

    app.get('/atividade/:id', isLoggedIn, function(req, res) {

    	var id = req.params.id;
      	req.getConnection(function(err,connection){

        connection.query('SELECT a.name AS act_name, a.description AS act_description, a.points, a.active FROM activities a  WHERE a.id = ?',[id], function(err,rows)
        {
            if(err)
              console.log("Error Selecting : %s ",err );

            res.render('atividade',{page_title:"atividade - Node.js",data:rows});
        });
      });
    });

    app.get('/atividades', isLoggedIn, function(req, res) {

      	req.getConnection(function(err,connection){
        var q = "SELECT a.name AS act_name, a.description AS act_description, a.points, a.active, t.name AS type_name, t.description AS type_description FROM activities a JOIN type_activity t ON a.type = t.id";
        connection.query(q, function(err,rows)
        {
            if(err)
              console.log("Error Selecting : %s ",err );

            //res.render('desafiosLista',{page_title:"atividade - Node.js",data:rows});
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

    function isAdmin (req,res)
    {
      if (req.user.type == 0)
        return true;
      else
        return false;
    }
}