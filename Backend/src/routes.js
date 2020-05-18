const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const InstitutionController = require('./app/controllers/InstitutionController');
const ClassesInstitutionController = require('./app/controllers/ClassesInstitutionController');
const LectureController = require('./app/controllers/LectureController');
const AceInstitutionController = require('./app/controllers/AceInstitutionController');
const StudentController = require('./app/controllers/StudentController');
const ResearcherController = require('./app/controllers/ResearcherController');
const AdministratorController = require('./app/controllers/AdministratorController');
const Jovem_ACE = require('./app/controllers/Jovem_ACEController');
const EducationWorker = require('./app/controllers/EducationWorkerController');
const HealthWorker = require('./app/controllers/HealthWorkerController');



const routes = Router();

routes.get('/users', UserController.index);
routes.get('/user', UserController.get);
routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);
routes.post('/user/passwordRecovery', UserController.passwordRecover);
routes.get('/user/:id/reset/:token', UserController.resetPassword);
const passport = require('passport');
const logout = require('./app/controllers/passport')

routes.post('/signin', passport.authenticate('local-signin', {
    //TODO mudar esses redirects para o front end
    successRedirect: 'http://localhost:3001/users',
    failureRedirect: 'http://localhost:3001/'
}));
routes.get('/logout', logout.logout)

routes.get('/institution', InstitutionController.index);
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

routes.get('/lecture', LectureController.list);
routes.post('/lecture', LectureController.store);
routes.get('/lecture/:id', LectureController.show);
routes.delete('/lecture/:id', LectureController.destroy);

routes.get('/aceInstitution', AceInstitutionController.list);
routes.post('/aceInstitution', AceInstitutionController.store);
routes.get('/aceInstitution/:id', AceInstitutionController.show);
routes.delete('/aceInstitution/:id', AceInstitutionController.destroy);

routes.get('/aluno', StudentController.list);
routes.post('/aluno', StudentController.store);
routes.put('/aluno/:id', StudentController.update);
routes.delete('/aluno/:id', StudentController.destroy);

routes.get('/pesquisador', ResearcherController.list);
routes.post('/pesquisador', ResearcherController.store);
routes.put('/pesquisador/:id', ResearcherController.update);
routes.delete('/pesquisador/:id', ResearcherController.destroy);

routes.get('/administrador', AdministratorController.list);
routes.post('/administrador', AdministratorController.store);
routes.put('/administrador/:id', AdministratorController.update);
routes.delete('/administrador/:id', AdministratorController.destroy);

routes.get('/jovem_ace', Jovem_ACE.list);
routes.post('/jovem_ace', Jovem_ACE.store);
routes.put('/jovem_ace/:id', Jovem_ACE.update);
routes.delete('/jovem_ace/:id', Jovem_ACE.destroy);

routes.get('/profissional_educacao', EducationWorker.list);
routes.post('/profissional_educacao', EducationWorker.store);
routes.put('/profissional_educacao/:id', EducationWorker.update);
routes.delete('/profissional_educacao/:id', EducationWorker.destroy);

routes.get('/profissional_saude', HealthWorker.list);
routes.post('/profissional_saude', HealthWorker.store);
routes.put('/profissional_saude/:id', HealthWorker.update);
routes.delete('/profissional_saude/:id', HealthWorker.destroy);

module.exports = routes;