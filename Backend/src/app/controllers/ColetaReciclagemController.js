const { ColetaReciclagem, Quiz, Files } = require('../models');

class ColetaReciclagemController{
    async list(req,res) {
        try{          
            const coletaReciclagemTask = await ColetaReciclagem.findAll({
                where: { user_id: req.params.id },
                attributes: ['student_id', 'feedback_video', 'receipt_id', 'status_receipt'],
                include: [
                    {
                        model: Quiz,
                        as: 'quiz',
                        attributes: ['id', 'nome', 'deadline', 'list_questions']
                    },
                    {
                        model: Files,
                        as: 'receipt',
                        attributes: ['id', 'data', 'url'],
                    },
                ],
            });

            return res.json(coletaReciclagemTask);
            
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async store(req, res) {
        try {
            console.log(req.body);
            const coletaReciclagemTask = await ColetaReciclagem.create(req.body);
            
            return res.json(coletaReciclagemTask);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async show(req, res) {
        try {
          const coletaReciclagemTask = await ColetaReciclagem.findByPk(req.params.id);
    
          return res.json(coletaReciclagemTask);
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
    }
    
    async destroy(req, res) {
        try {
            const coletaReciclagemTask = await ColetaReciclagem.findByPk(req.params.id);
            
            await coletaReciclagemTask.destroy();
            
            return res.json();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async update(req, res) {
        try {
            const coletaReciclagemTask = await ColetaReciclagem.findByPk(req.params.id);
            
            await coletaReciclagemTask.update(req.body);
            
            return res.json(coletaReciclagemTask);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
}

module.exports = new ColetaReciclagemController();