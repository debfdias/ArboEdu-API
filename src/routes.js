const { Router } = require('express');
const UserController = require('./app/controllers/UserController');

const routes = Router();

routes.get('/users', UserController.index);
routes.get('/user', UserController.get);
routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

module.exports = routes;