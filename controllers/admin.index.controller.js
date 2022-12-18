const admin = require('../inc/admin')(io);


async function renderHome(req, res, _next){
  admin.home().then(data => {

    res.render('admin/index', {
        url: req.url,
        user: req.session.user,
        data
    });

});
}

module.exports = {renderHome}