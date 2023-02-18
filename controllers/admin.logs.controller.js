const admin = require('../inc/admin')(io);

async function getLogs(req, res, next){
  admin.logs().then(data => {

    res.render('admin/logs', {
        url: req.url,
        user: req.session.user,
        data
    });

});
}

async function deleteLogs(req, res, next){
  admin.logsDelete(req).then(data => {

    res.send(data);

}).catch(err => {

    res.status(400);
    res.send({
        error: err
    });

});
}


module.exports = {getLogs, deleteLogs}