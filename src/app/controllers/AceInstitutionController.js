const { AceInstitution } = require('../models');

class AceInstitutionController {

	async list(req,res){
		try {
			const aceInstitutions = await AceInstitution.findAll();

			return res.json(aceInstitutions);
		}
		catch (err) {

			return res.status(400).json({ error: err.message });
		}
	}

	async show(req, res) {
	  	try {
	    	const aceInstitution = await AceInstitution.findByPk(req.params.id);

	    	return res.json(aceInstitution);
	  	} 
	  	catch (err) {

	    	return res.status(400).json({ error: err.message });
	  	}
	}

	async store(req, res) {
	  	try {
	  		console.log(req.body);

	    	const aceInstitution = await AceInstitution.create(req.body);

	    	return res.json(aceInstitution);
	  } 
	  catch (err) {

	   		return res.status(400).json({ error: err.message });
	  }
	}

	async destroy(req, res) {
	  	try {
	    	const aceInstitution = await AceInstitution.findByPk(req.params.id);

	    	await aceInstitution.destroy();

	    	return res.json();
	  }
	  catch (err) {

	    	return res.status(400).json({ error: err.message });
	  }
	}



}

module.exports = new AceInstitutionController();