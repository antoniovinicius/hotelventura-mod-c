const site = require('../inc/site')(io);

async function renderQuartos(req, res, _next){
    site.quartos().then(results => {
  
    res.render('site/quartos', Object.assign({}, {
        title: 'Quartos - Hotel Ventura',
        header: {
          background: 'images/img_bg_5.jpg',
          title: 'Contemple nossas acomodações!'
        },
        quartos: results,
        headerIndex: false
      }))
  });
}
  
module.exports = {renderQuartos}