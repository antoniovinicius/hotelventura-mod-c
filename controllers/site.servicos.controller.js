const site = require('../inc/site')(io);

async function renderServicos(req, res, _next){
    res.render('site/servicos', Object.assign({}, {
        title: 'Serviços - Hotel Ventura',
        header: {
          background: 'images/img_bg_1.jpg',
          title: 'É um prazer poder servir!'
        },
      headerIndex: false,
        isAuthenticated: req.isAuthenticated(),
      body: {},
        user:req.user
      }));
}
  
module.exports = {renderServicos}