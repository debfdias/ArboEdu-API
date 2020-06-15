/*
 * GET home page.
 */

//Chamada para Tela Index
exports.index = function(req, res) {
    res.render('index', { title: 'Página Inicial - Arboedu' });
};