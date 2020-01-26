const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const InstitutionController = require('./app/controllers/InstitutionController');

const routes = Router();

routes.get('/users', UserController.index);
routes.get('/user', UserController.get);
routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

routes.get('/institutions', InstitutionController.index);
routes.get('/institution', InstitutionController.get);
routes.post('/institution', InstitutionController.store);
routes.get('/institution/:id', InstitutionController.show);
routes.put('/institution/:id', InstitutionController.update);
routes.delete('/institution/:id', InstitutionController.destroy);


module.exports = routes;