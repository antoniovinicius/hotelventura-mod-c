const site = require('../inc/site')(io);

async function renderUsuarioadmin(req, res, _next){
    res.render('site/usuarioadmin', Object.assign({}, {
        title: 'Administração do Usuário - Hotel Ventura',
        header: {
          background: 'images/img_bg_6.jpg',
          title: 'Administração do Usuário'
        },
        headerIndex: false,
        body: {}
      }));
}
  
module.exports = {renderUsuarioadmin}

