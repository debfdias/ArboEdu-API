const { TanquesJanelas } = require('../models');

class TanquesJanelasController {
    async list(req,res) {
        try{
            const tanquesJanelasTask = await TanquesJanelas.findAll();
            
            return res.json(tanquesJanelasTask);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async store(req, res) {
        try {
            console.log(req.body);
            const tanquesJanelasTask = await TanquesJanelas.create(req.body);
            
            return res.json(tanquesJanelasTask);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async show(req, res) {
        try {
            const tanquesJanelasTask = await TanquesJanelas.findByPk(req.params.id);
            
            const photos = await tanquesJanelasTask.photo;
            
            console.log(photos)
            
            return res.send({
                student_id,
                local_type,
                focus_type,
                solution,
                additional_comment,
                status,
                photos
            });
            
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async destroy(req, res) {
        try {
            const tanquesJanelasTask = await TanquesJanelas.findByPk(req.params.id);
            
            await tanquesJanelasTask.destroy();
            
            return res.json();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async update(req, res) {
        try {
            const tanquesJanelasTask = await TanquesJanelas.findByPk(req.params.id);
            
            await tanquesJanelasTask.update(req.body);
            
            return res.json(tanquesJanelasTask);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    
}

module.exports = new TanquesJanelasController();