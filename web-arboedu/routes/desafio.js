/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

 module.exports = function(app, passport) {

 	app.get('/desafio/:id/pontos', isLoggedIn, function(req, res) {
 		var id = req.params.id;
 		//var id = 1;
 		req.getConnection(function (err,connection){

 			if(isStudent(req,res))
 			{
 				var email  = req.user.email;

 				connection.query('SELECT * from students WHERE email = ? ', [email], function(err,rows_stu){
 					var finished = rows_stu[0].finished_act;

 					if(finished==1)
 					{
 						connection.query('SELECT * from activities WHERE id = ? ', [id], function(err,rows_points){
	 					//console.log (rows_points)
	 					var points = rows_points[0].points;
				      	
		 				connection.query('UPDATE students SET points = points + ?, finished_act = 2 WHERE email = ? ', [points, email], function(err,rows_){
		 					if(err)
				                console.log("Error updating : %s ",err );
				            else
				            {
				                console.log("pontos computados para o estudante");
				                connection.query("SELECT * from students WHERE email = ? ",[email], function(err, rows)
				 				{
				 					var school_id = rows[0].school_id;
				 					connection.query('UPDATE schools SET points = points + ? WHERE id = ? ', [points, school_id], function(err,rows_){
					 					if(err)
							                console.log("Error updating : %s ",err );
							            else
							                console.log("pontos computados para escola");

							            res.redirect('/sistema');
				 					});

				 				});
				            }
			 				

			 				});
		 				});	

 					}
 					else if(finished==0)
 					{
 						console.log("nao terminou a atividade ainda, sem pontos")
 						res.redirect('/sistema');
 					}
 					else if(finished==2)
 					{
 						console.log("ja terminou a atividade")
 						res.redirect('/sistema');
 					}


 				});
 			}
 			else
 			{
 				console.log("voce nao eh estudante, nao pode gerar pontos");
 				res.redirect('/sistema');
 			}

 		});
 	});

  	app.get('/estudante/:id/pontos', isLoggedIn, function(req, res) {
  		var id = req.params.id;
 		req.getConnection(function (err,connection){

 		});
 	});

 	app.get('/escola/:id/pontos', isLoggedIn, function(req, res) {
 		var id = req.params.id;
 		req.getConnection(function (err,connection){

 		});
 	});

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

     function isTest(req,res)
     {
       if (req.user.type == 4)
         return true;
       else
         return false;
     }

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
 }