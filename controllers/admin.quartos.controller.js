const admin = require("../inc/admin")(io);

async function renderQuarto(req, res, next) {
  admin.quartos().then((data) => {
    console.log("controller");
    console.log(data);
    if (data) {
      if (data.quartos && data.quartos.length > 0) {
        for (quarto of data.quartos) {
          quarto.fotos = [];
          if (data.fotos && data.fotos.length > 0) {
            for (foto of data.fotos) {
              if (foto.fk_id_quarto === quarto.id_quarto) {
                quarto.fotos.push(foto);
              }
            }
          }
        }
        
      }
    }

    console.log(data);

    res.render("admin/quartos", {
      url: req.url,
      user: req.session.user,
      data: data.quartos,
      fotos: data.fotos,
    });
  });
}

async function criarQuarto(req, res, next) {
  
  admin
    .quartosSave(req)
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

async function adcionarFotos(req, res, next) {
  console.log("adcionar")
  admin
    .adcionarFotos(req)
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

async function removerFoto(req, res, next) {
  console.log('remover foto')
  admin
    .removerFoto(req)
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

async function deleteQuarto(req, res, next) {
  admin
    .quartosDelete(req)
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

module.exports = { renderQuarto, criarQuarto, deleteQuarto, adcionarFotos, removerFoto };
