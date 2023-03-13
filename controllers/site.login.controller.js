const site = require('../inc/site')(io);

async function renderLogin(req, res, _next){
    const fail = req.query.fail;
    const cadastro = req.query.cadastro;
    const failgoogle = req.query.failgoogle;

    res.render('site/login', Object.assign({}, {
        title: 'Login - Hotel Ventura',
        header: {
          background: 'images/img_bg_4.jpg',
          title: 'Faça seu Login!!'
        },
      headerIndex: false,
        isAuthenticated: req.isAuthenticated(),
      body: {},
        user:req.user,
        fail: fail,
        cadastro: cadastro,
        failgoogle: failgoogle
      }));
}

module.exports = {renderLogin}

