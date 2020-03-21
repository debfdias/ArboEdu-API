/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

module.exports = function(app, passport, parameters) {

    app.get('/sistema', isLoggedIn, function(req, res) {
        req.getConnection(function(err, connection) {

            var query = connection.query('SELECT * FROM users', function(err, rows) {
                var user = req.user;
                var email = req.user.email;

                if (isTeacher(req, res)) {
                    connection.query('SELECT * FROM teachers where email=?', [email], function(err, rows_teacher) {
                        if (err)
                            console.log("Error Selecting : %s ", err);

                        res.render('sistema', { page_title: "sistema - Node.js", data0: rows, user, data: rows_teacher });

                    });

                } else if (isStudent(req, res)) {
                    connection.query('SELECT * FROM students where email=?', [email], function(err, rows_student) {
                        if (err)
                            console.log("Error Selecting : %s ", err);

                        res.render('sistema', { page_title: "sistema - Node.js", data0: rows, user, data: rows_student });

                    });
                } else {
                    res.render('sistema', { page_title: "sistema - Node.js", data0: rows, user });
                }
            });
        });
    });

    app.get('/sistema/perfil', isLoggedIn, function(req, res) {
        req.getConnection(function(err, connection) {
            var email = req.user.email;
            if (isStudent(req, res)) {
                connection.query('SELECT * FROM students where email=?', [email], function(err, rows_student) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    //else
                    //res.render('estudante', {page_title:"estudante", student:rows_student});
                });
            } else if (isTeacher(req, res)) {
                connection.query('SELECT * FROM teachers where email=?', [email], function(err, rows_teacher) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    //else
                    //res.render('professor', {page_title:"estudante", teacher:rows_teacher});
                });
            }
        });
    });

    app.get('/sistema/login', isNotLoggedIn, function(req, res) {
        var options = {};
        options.message = req.flash('loginMessage');

        res.locals.message = req.flash('loginMessage');
        res.render('index', options);
    });


    app.post('/sistema/login', passport.authenticate('local-login', {
        successRedirect: '/sistema', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages

    }));

    app.get('/sistema/delete/:id', isLoggedIn, function(req, res) {

        var id = req.params.id;

        req.getConnection(function(err, connection) {

            connection.query('SELECT * FROM users where id=?', [id], function(err, rows) {
                var email = rows[0].email;
                var type = rows[0].type;
                console.log(email)

                if (isAdmin(req, res)) {
                    connection.query("DELETE FROM users  WHERE id = ? ", [id], function(err, rows) {
                        if (type == 2) {
                            connection.query("DELETE FROM teachers  WHERE email = ? ", [email], function(err, rows) {
                                if (err)
                                    console.log("Error deleting : %s ", err);
                                else
                                    console.log("professor deletado")
                                res.redirect('/sistema');
                            });
                        } else if (type == 1) {
                            connection.query("DELETE FROM students  WHERE email = ? ", [email], function(err, rows) {
                                if (err)
                                    console.log("Error deleting : %s ", err);
                                else
                                    console.log("aluno deletado")
                                res.redirect('/sistema');
                            });
                        }
                    });
                } else {
                    console.log("apenas admins podem deletar");
                    res.redirect('/sistema');
                }
            });
        });

    });

    app.get('/sistema/edit/:id', isLoggedIn, function(req, res) {
        var id = req.params.id;

        req.getConnection(function(err, connection) {


            if (req.user.id == id) //usuario logado modifica o seu proprio perfil
            {
                var query = connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, rows) {
                    if (err)
                        console.log("Error Selecting : %s ", err);

                    res.render('edit', { page_title: "Edit sistema - Node.js", data: rows });
                });
            } else {
                console.log("voce nao tem permissao pra editar outro perfil alem do seu");
                res.redirect('/sistema');
            }
        });

    });

    app.post('/sistema/edit/:id', function(req, res) {

        var input = JSON.parse(JSON.stringify(req.body));
        var id = req.params.id;

        req.getConnection(function(err, connection) {

            var data = {

                name: input.name,
                email: input.email
            };

            if (isTeacher(req, res)) {
                connection.query("UPDATE users set ? WHERE id = ? ", [data, id], function(err, rows) {
                    if (err)
                        console.log("Error Updating : %s ", err);

                    connection.query("UPDATE teachers set ? WHERE email = ? ", [data, req.user.email], function(err2, rows2) {
                        if (err2)
                            console.log("Error Updating : %s ", err2);
                        console.log("editado professor")
                        res.redirect('/sistema');
                    });

                });
            } else if (isStudent(req, res)) {
                connection.query("UPDATE users set ? WHERE id = ? ", [data, id], function(err, rows) {
                    if (err)
                        console.log("Error Updating : %s ", err);

                    connection.query("UPDATE students set ? WHERE email = ? ", [data, req.user.email], function(err2, rows2) {
                        if (err2)
                            console.log("Error Updating : %s ", err2);
                        console.log("editado estudante")
                        res.redirect('/sistema');
                    });

                });
            }



        });

    });

    app.get('/sistema/logout', isLoggedIn, function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        })

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

    function isStudent(req, res) {
        if (req.user.type == 1)
            return true;
        else
            return false;
    }

    function isTeacher(req, res) {
        if (req.user.type == 2)
            return true;
        else
            return false;
    }

    function isAdmin(req, res) {
        if (req.user.type == 0)
            return true;
        else
            return false;
    }

}