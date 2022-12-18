const site = require('../inc/site')(io);

async function renderHome(req, res, _next){
    site.home().then(results => {
  
    res.render('site/index', Object.assign({}, {
        title: 'Hotel Ventura',
        quartos: results,
        headerIndex: true
    })) 
  });
}

module.exports = {renderHome}