/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */
 
module.exports = function(app, passport) {

    app.get('/desafio/delete/:id', isLoggedIn, function(req, res) {

       var id = req.params.id;

       req.getConnection(function (err, connection) {

          if(isAdmin(req,res)){
            connection.query("DELETE FROM challenges WHERE id = ? ",[id], function(err, rows)
            {
            	if(err)
                    console.log("Error deleting : %s ",err );
                else
                	console.log("desafio deletada por admin");
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

    app.get('/desafio/edit/:id', isLoggedIn, function(req, res) {
      var id = req.params.id;

      req.getConnection(function(err,connection){

      	if(isAdmin(req,res))
      	{
	        var query = connection.query('SELECT * FROM challenges WHERE id = ?',[id],function(err,rows)
	        {
	         	if(err)
	            	console.log("Error Selecting : %s ",err );

	          	//res.render('atividadeEdit',{page_title:"Edit sistema - Node.js",data:rows});
	        });
  	    }
  	    else
  	    {
  	    	console.log("admins editam desafio");
  	    	res.redirect('/sistema');
  	    }
      }); 
    });

    app.post('/desafio/edit/:id', function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;

      req.getConnection(function (err, connection) {

      	var data = {

            name          : input.name,
            description   : input.description
        };

        if(isAdmin(req,res)) 
        {
        	connection.query("UPDATE challenges set ? WHERE id = ? ",[data,id], function(err, rows) {
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

    app.get('/desafio/cadastro', isLoggedIn, function(req, res) {

      const challenges = "select * from activities";

      	req.getConnection(function(err,connection){
        
	        if(isAdmin(req,res))
	        {  
            connection.query(challenges,function (err,rows1)
            {
              res.render('cadastroDesafio',{page_title:"ZikaWEB ",  data:rows1});
            });
	        }
	        else
	        {
	            console.log("voce nao pode cadastrar desafio");
	            res.redirect('/sistema');
	        }
      });
    });

    app.post('/desafio/cadastro', function(req, res) {

	    var input = JSON.parse(JSON.stringify(req.body));
      var acts = input.acts + " ";

	    req.getConnection(function (err, connection) {

		    var data = {

	            name         : input.name,
	            description  : input.description,
              acts_ids     : acts

	        };

	        connection.query("INSERT INTO challenges set ?",[data], function(err,rows){
	        	if(err)
            		console.log("Error inserting : %s ",err );
            	else
					console.log("atividade cadastrada");

            	res.redirect('/sistema');
            });

	    });
    });

    app.get('/desafio/:id', isLoggedIn, function(req, res) {

    	var id = req.params.id;
      	req.getConnection(function(err,connection){

        connection.query('SELECT * FROM challenges WHERE id = ?',[id], function(err,rows)
        {
            if(err)
              console.log("Error Selecting : %s ",err );

            //res.render('atividade',{page_title:"atividade - Node.js",data:rows});
        });
      });
    });

    app.get('/desafios', isLoggedIn, function(req, res) {

      	req.getConnection(function(err,connection){
        var q = "SELECT * FROM challenges";
        connection.query(q, function(err,rows)
        {
            if(err)
              console.log("Error Selecting : %s ",err );

            //res.render('atividadesLista',{page_title:"atividade - Node.js",data:rows});
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