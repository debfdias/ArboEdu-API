const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const InstitutionController = require('./app/controllers/InstitutionController');
const ClassesInstitutionController = require('./app/controllers/ClassesInstitutionController');
const LectureController = require('./app/controllers/LectureController');
const AceInstitutionController = require('./app/controllers/AceInstitutionController');


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

routes.get('/:idInst/classesInstitution', ClassesInstitutionController.index);
routes.get('/:idInst/classInstitution', ClassesInstitutionController.get);
routes.post('/:idInst/classInstitution', ClassesInstitutionController.store);
routes.get('/classInstitution/:id', ClassesInstitutionController.show);
routes.put('/classInstitution/:id', ClassesInstitutionController.update);
routes.delete('/classInstitution/:id', ClassesInstitutionController.destroy);

routes.get('/lectures', LectureController.list);
routes.post('/lecture', LectureController.store);
routes.get('/lecture/:id', LectureController.show);
routes.delete('/lecture/:id', LectureController.destroy);

routes.get('/aceInstitutions', AceInstitutionController.list);
routes.post('/aceInstitution', AceInstitutionController.store);
routes.get('/aceInstitution/:id', AceInstitutionController.show);
routes.delete('/aceInstitution/:id', AceInstitutionController.destroy);


module.exports = routes;