/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */


 module.exports = function(app, passport) {

 	app.get('/ranking/escolas', isLoggedIn, function(req, res) {
 		req.getConnection(function (err,connection){
 			var SearchBoxValue = "" ;
 			var message = "";
	 		connection.query('SELECT * FROM schools ORDER BY points DESC', function(err,rows){
	 			if(err)
	 			{
	 				console.log("alguma coisa deu errado");
	 				res.redirect('/sistema');
	 			}
	 			else
	 			{
	 				res.render('rankingEscolas', {page_title:"ranking escolas", data:rows, SearchBoxValue, message});
	 			}

	 		});
 		});
	 });

 	app.post('/ranking/escolas', function(req, res) {
 		req.getConnection(function (err,connection){

 			var SearchBoxValue = req.body.SearchBox;
 			var SearchBox      = req.body.SearchBox;

 			var q = "SELECT * FROM schools WHERE name LIKE '%"+SearchBox+"%' ORDER BY points DESC";
 			connection.query(q, function(err,rows){
 				if(err)
 				{
	 				console.log("deu errado");
	 				res.redirect('/sistema');
	 			}
	 			else
	 			{
	 				if(rows.length > 0){
						var message = "";
					}
					else{
						var message = "Escola não encontrada";
						console.log(message)
					}
	 			}

	 			res.render('rankingEscolas', {page_title:"ranking escolas", data:rows, SearchBoxValue, message});

 			});

 		});
 	});

 	app.get('/ranking/estudantes', isLoggedIn, function(req, res) {
 		req.getConnection(function (err,connection){
 			var SearchBoxValue = "" ;
 			var message = "";

	 		connection.query('SELECT st.name AS name, st.points, sc.name AS school_name FROM students st JOIN schools sc ON sc.id = st.school_id ORDER BY st.points DESC', function(err,rows){
	 			if(err)
	 				console.log("alguma coisa deu errado");

		 		res.render('rankingEstudantes', {page_title:"ranking estudantes", data:rows, SearchBoxValue, message});
		 		
	 			
	 		});
	 	});
 	});

 	app.post('/ranking/estudantes', function(req, res) {
 		req.getConnection(function (err,connection){

 			var SearchBoxValue = req.body.SearchBox;
 			var SearchBox      = req.body.SearchBox;

 			var q = "SELECT st.name AS name, st.points, sc.name AS school_name FROM students st JOIN schools sc ON sc.id = st.school_id WHERE st.name LIKE '%"+SearchBox+"%' ORDER BY st.points DESC";
 			connection.query(q, function(err,rows){
 				if(err)
 				{
	 				console.log("deu errado");
	 				res.redirect('/sistema');
	 			}
	 			else
	 			{
	 				if(rows.length > 0){
						var message = "";
						
					}
					else{
						var message = "Estudante não encontrado";
						console.log(message)
					}
				 	
				 	res.render('rankingEstudantes', {page_title:"ranking estus", data:rows,  SearchBoxValue, message});
				 	
	 			}
 			});

 		});
 	});

  	app.get('/ranking/escola/:id', isLoggedIn, function(req, res) {
  		var id = req.params.id;
  		var SearchBoxValue = "" ;
 		var message = "";

 		req.getConnection(function (err,connection){
	 		connection.query('SELECT * FROM students WHERE school_id = ? ORDER BY points DESC',[id], function(err,rows){
	 			if(err)
	 				console.log("alguma coisa deu errado");

	 			connection.query('SELECT * FROM schools where id = ?', [id], function(err2,rows_){
	 				if(err2)
	 					console.log("alguma coisa deu errado 2");
	 				else
		 				res.render('rankingEscola', {page_title:"ranking estudantes", data:rows, school:rows_, SearchBoxValue, message});
		 		});
	 			
	 		});
	 	});
 	});

 	app.post('/ranking/escola/:id', function(req, res) {
 		req.getConnection(function (err,connection){
 			var id = req.params.id;
 			var SearchBoxValue = req.body.SearchBox;
 			var SearchBox      = req.body.SearchBox;

 			connection.query("SELECT * FROM students WHERE name LIKE '%"+SearchBox+"%' and school_id = ? ORDER BY points DESC",[id], function(err,rows){
 				if(err)
 				{
	 				console.log("deu errado");
	 				res.redirect('/sistema');
	 			}
	 			else
	 			{
	 				if(rows.length > 0){
						var message = "";
					}
					else{
						var message = "Estudante não encontrado";
						console.log(message)
					}

					connection.query('SELECT * FROM schools where id = ?', [id], function(err2,rows_){
						res.render('rankingEscola', {page_title:"ranking estus", data:rows, school:rows_, SearchBoxValue, message});
					});
	 			}
 			});

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

  function isAdmin (req,res) 
  {
    if (req.user.type == 0)
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