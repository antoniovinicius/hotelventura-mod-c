const site = require('../inc/site')(io);
const moment = require('moment');

async function renderReservas(req, res, _next){
    site.quartos().then(results => {
  
    res.render('site/reservas', Object.assign({}, {
        title: 'Reserva - Hotel Ventura',
        header: {
            background: 'images/img_bg_2.jpg',
            title: 'Reserve um quarto!'
        },
        quartos: results,
        headerIndex: false,
        moment,
        body: {}
      }))
  });
}

async function criarReserva(req, res, next) {
    site.reservasSave(req, res).then(data => {
      res.send(data);

  }).catch(err => {
  
      res.status(400);
      res.send({
          error: err
      });
  
  });
}
  
module.exports = {renderReservas, criarReserva}