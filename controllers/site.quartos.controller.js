const site = require('../inc/site')(io);

async function renderQuartos(req, res, _next) {
  
    site.renderQuartos().then(results => {
      console.log(results)
      res.render('site/quartos', Object.assign({}, {
        title: 'Quartos - Hotel Ventura',
        header: {
          background: 'images/img_bg_5.jpg',
          title: 'Contemple nossas acomodações!'
        },
      quartos: results.quartos,
      fotos:results.fotos,
        isAuthenticated: req.isAuthenticated(),
      headerIndex: false,
        user:req.user
      })
      )
  }).catch(err => {
        console.log(err);
      });
}
  
module.exports = {renderQuartos}