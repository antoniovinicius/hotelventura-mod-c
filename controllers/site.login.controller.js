const site = require('../inc/site')(io);

async function renderLogin(req, res, _next){
    res.render('site/login', Object.assign({}, {
        title: 'Login - Hotel Ventura',
        header: {
          background: 'images/img_bg_4.jpg',
          title: 'Faça seu Login!!'
        },
        headerIndex: false,
        body: {}
      }));
}

module.exports = {renderLogin}

