const { School } = require('../models');

class SchoolController {

	async list(req,res){
		School.findAll().then(allSchools=>{
            return res.json(allSchools);
        }).catch(err=>{return res.status(400).json(err)})
	}

	async update(req, res) {
	    School.findByPk(req.params.id).then(schoolToUpdate=>{
            return res.json(schoolToUpdate);
        }).catch(err=>{return res.status(400).json(err)})
	}

	async store(req, res) {
	    School.create(req.body).then(newSchool=>{
            return res.json(newSchool);
        }).catch(err=>{return res.status(400).json(err)})
	}

	async destroy(req, res) {
	    School.findByPk(req.params.id).then(deletedSchool=>{
            deletedSchool.destroy().then(result=>{
                return res.json(result)
            }).catch(err=>{return res.status(400).json(err)})
        }).catch(err=>{return res.status(400).json(err)})
	}
}

module.exports = new SchoolController();