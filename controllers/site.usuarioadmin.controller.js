const site = require("../inc/site")(io);
const moment = require('moment');

async function renderUsuarioadmin(req, res, _next) {
  res.render(
    "site/usuarioadmin",
    Object.assign(
      {},
      {
        title: "Administração do Usuário - Hotel Ventura",
        header: {
          background: "images/img_bg_6.jpg",
          title: "Administração do Usuário",
        },
        headerIndex: false,
        isAuthenticated: req.isAuthenticated(),
        body: {},
        user: req.user,
      }
    )
  );
}

async function renderMinhasreservas(req, res, _next) {
  site.reservas(req).then(results => {
    res.render(
      "site/minhasreservas",
      Object.assign(
        {},
        {
          title: "Administração do Usuário - Hotel Ventura",
          header: {
            background: "images/img_bg_6.jpg",
            title: "Administração do Usuário",
          },
          data: results,
          moment,
          headerIndex: false,
          isAuthenticated: req.isAuthenticated(),
          body: {},
          user: req.user,
        }
      )
    );
  }).catch(err => {
   
    if (err.message === "Usuario nao esta logado") {
      res.redirect("/login");
    } else {
      res.status(400);
      res.send({
        error: err
    });
    }
    

});
}

async function deleteMinhasReservas(req, res, next) {
  site.reservasDelete(req).then(data => {

    res.send(data);

  }).catch(err => {
  console.log(err);

    res.status(400);
    res.send({
        error: err
    });

});
}

async function renderSenha(req, res, _next) {
  res.render(
    "site/senha",
    Object.assign(
      {},
      {
        title: "Administração do Usuário - Hotel Ventura",
        header: {
          background: "images/img_bg_6.jpg",
          title: "Administração do Usuário",
        },
        headerIndex: false,
        isAuthenticated: req.isAuthenticated(),
        body: {},
        user: req.user,
      }
    )
  );
}

async function renderNome(req, res, _next) {
  site.nome(req).then(results => {
    res.render(
      "site/nome",
      Object.assign(
        {},
        {
          title: "Administração do Usuário - Hotel Ventura",
          header: {
            background: "images/img_bg_6.jpg",
            title: "Administração do Usuário",
          },
          headerIndex: false,
          data: results,
          isAuthenticated: req.isAuthenticated(),
          body: {},
          user: req.user,
        }
      )
    );
  });
}

async function alterarNome(req, res, next) {
  site
    .nomeUpdate(req, res)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send({
        error: err,
      });
    });
}

async function criarSenha(req, res, next) {
  site
    .senhaSave(req, res)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send({
        error: err,
      });
    });
}

module.exports = {
  renderUsuarioadmin,
  renderMinhasreservas,
  renderSenha,
  renderNome,
  alterarNome,
  criarSenha,
  deleteMinhasReservas
};
