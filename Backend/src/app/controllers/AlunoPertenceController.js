const { AlunoPertence } = require('../models');

class AlunoPertenceController {

	async list(req,res){
		AlunoPertence.findAll().then(allAlunos=>{
            return res.json(allAlunos);
        }).catch(err=>{return res.status(400).json(err)})
	}

	async update(req, res) {
	    AlunoPertence.findByPk(req.params.id).then(alunoToUpdate=>{
            return res.json(alunoToUpdate);
        }).catch(err=>{return res.status(400).json(err)})
	}

	async store(req, res) {
	    AlunoPertence.create(req.body).then(newAluno=>{
            return res.json(newAluno);
        }).catch(err=>{return res.status(400).json(err)})
	}

	async destroy(req, res) {
	    AlunoPertence.findByPk(req.params.id).then(deletedAluno=>{
            deletedAluno.destroy().then(result=>{
                return res.json(result)
            }).catch(err=>{return res.status(400).json(err)})
        }).catch(err=>{return res.status(400).json(err)})
	}
}

module.exports = new AlunoPertenceController();