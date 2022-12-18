module.exports = (io) => {

  let conn = require('../inc/db');
  const express = require('express');
  let formidable = require('formidable');
  // let Pagination = require('./Pagination');
  const router = express.Router();

  const SiteController = require('../controllers/site.index.controller');
  const QuartosController = require('../controllers/site.quartos.controller');
  const ServicosController = require('../controllers/site.servicos.controller.js');
  const ContatosController = require('../controllers/site.contatos.controller.js');
  const ReservaController = require('../controllers/site.reservas.controller');
  //  const LoginController = require('../controllers/site.login.controller');
  //  
  
  let defaultsReservas = {
    title: 'Reserva - Hotel Ventura',
    header: {
      background: 'images/img_bg_2.jpg',
      title: 'Reserve um quarto!'
    },
    body: {}
  };
  
  
  let defaultLogin = {
    title: 'Login - Hotel Ventura',
    header: {
      background: 'images/img_bg_4.jpg',
      title: 'Faça seu Login!'
    },
    body: {}
  };

  
  router.get('/', SiteController.renderHome);

  router.get('/quartos', QuartosController.renderQuartos);
  
  router.get('/servicos', ServicosController.renderServicos);

  router.get('/contatos', ContatosController.renderContatos);
      
  router.post('/contatos', ContatosController.criarContato);

  router.get('/reservas', ReservaController.renderReservas);

  router.post('/reservas', ReservaController.criarReserva);

  router.get('/login', (req, res, next) => {

    res.render('site/login', Object.assign({}, defaults, defaultLogin));

  });

  return router;

};