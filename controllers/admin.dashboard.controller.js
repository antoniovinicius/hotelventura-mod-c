const admin = require('../inc/admin')(io);

async function getDashboard(req, res, next){
  admin.logs().then(data => {

    res.render('admin/dashboard', {
        url: req.url,
        user: req.session.user,
        data
    });

});
}

module.exports = {getDashboard}