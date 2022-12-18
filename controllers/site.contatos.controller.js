const site = require('../inc/site')(io);

async function renderContatos(req, res, _next){
    res.render('site/contatos', Object.assign({}, {
        title: 'Contato - Hotel Ventura',
        header: {
          background: 'images/img_bg_3.jpg',
          title: 'Diga um oi!'
        },
        headerIndex: false,
        body: {}
      }));
}

async function criarContato(req, res, next) {
    site.contatosSave(req, res).then(data => {
      res.send(data);

  }).catch(err => {
  
      res.status(400);
      res.send({
          error: err
      });
  
  });
}
  
module.exports = {renderContatos, criarContato}

