const { Focus } = require('../models');
class PatrulhaZikaController {
  async list(req, res) {
    try {
      const focus = await Focus.findAll();
      return res.json(focus);
      //return res.render('focus', { data: focus })
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    console.log(req.body);
    Focus.create(req.body).then(result=>{
        return res.json(result);
    }).catch(err=>{
        return res.status(400).json({ error: err.message });
    });
    
    
  }

  async update(req, res) {
    Focus.findByPk(req.params.id).then(focus=>{
        focus.update(req.body).then(result=>{
            return res.status(200).json(result);
        }).catch(err=>{
            return res.status(400).json({ error: err.message });
        })
    }).catch(err=>{
        return res.status(400).json({ error: err.message });
    })




  }

  async destroy(req, res) {
      Focus.findByPk(req.params.id).then(focus=>{
          focus.destroy().then(result=>{
              return res.status(200).json(result);
          }).catch(err=>{
              return res.status(400).json({ error: err.message });
          })
      }).catch(err=>{
        return res.status(400).json({ error: err.message });
      })

    
  }
}

module.exports = new PatrulhaZikaController();