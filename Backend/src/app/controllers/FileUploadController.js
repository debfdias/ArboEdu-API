const fs = require("fs");
const path = require("path");

const { Files } = require('../models');

class FileUploadController {

	async list(req, res) {
		try {
			const files = await Files.findAll( { where: { user_id: req.params.id } } );

			return res.json(files);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}

	async show(req, res) {
		try {
			const file = await Files.findByPk(req.params.id);

			return res.json(file);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}

	async store(req, res) {
		try {
			console.log(req.file);

			if (req.file == undefined) {
				return res.send("Selecione um arquivo");
			}

			Files.create({
				user_id: "",
				type: req.file.mimetype,
				name: req.file.originalname,
				url: "",
				data: fs.readFileSync(
					__basedir + "/resources/uploads/" + req.file.filename
					),
			}).then((file) => {
				fs.writeFileSync(
					__basedir + "/resources/tmp/" + file.name,
					file.data
					);

				return res.send("Arquivo enviado com sucesso!");
			});
		} catch (err) {
			console.log(error);
			return res.status(400).json({ error: err.message });
		}
	}

	async destroy(req, res) {
		try {
			const file = await Files.findByPk(req.params.id);

			await file.destroy();

			return res.json();
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}
}

module.exports = new FileUploadController();