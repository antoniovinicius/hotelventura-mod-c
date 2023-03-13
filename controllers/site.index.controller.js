const site = require('../inc/site')(io);

async function renderHome(req, res, _next){
    site.renderQuartos().then(results => {
  
    res.render('site/index', Object.assign({}, {
        title: 'Hotel Ventura',
         quartos: results.quartos,
      fotos:results.fotos,
      headerIndex: true,
      isAuthenticated: req.isAuthenticated(),
        user:req.user
    })) 
  });
}

async function inscreverEmail(req, res, next) {
  site.emailSave(req, res).then(data => {
    res.send(data);

}).catch(err => {

    res.status(400);
    res.send({
        error: err
    });

});
}


module.exports = {renderHome, inscreverEmail}