module.exports = (io) => {

  let conn = require('../inc/db');
  const express = require('express');
  const router = express.Router();

  const SiteController = require('../controllers/site.index.controller');
  const QuartosController = require('../controllers/site.quartos.controller');
  const ServicosController = require('../controllers/site.servicos.controller.js');
  const ContatosController = require('../controllers/site.contatos.controller.js');
  const ReservaController = require('../controllers/site.reservas.controller');
  const LoginController = require('../controllers/site.login.controller'); 
  const UsuarioadminController = require('../controllers/site.usuarioadmin.controller'); 

  router.get('/', SiteController.renderHome);

  router.get('/quartos', QuartosController.renderQuartos);
  
  router.get('/servicos', ServicosController.renderServicos);

  router.get('/contatos', ContatosController.renderContatos);
      
  router.post('/contatos', ContatosController.criarContato);

  router.get('/reservas', ReservaController.renderReservas);

    router.post('/reservas', ReservaController.criarReserva);
    router.post('/reservas/edit', ReservaController.editReserva);

  router.get('/login', LoginController.renderLogin);

  router.post('/subscribe', SiteController.inscreverEmail);

  router.get('/usuarioadmin', UsuarioadminController.renderUsuarioadmin);

  router.post('/nome', UsuarioadminController.alterarNome);

    router.get('/minhasreservas', UsuarioadminController.renderMinhasreservas);
    
    router.delete("/minhasreservas/:id", UsuarioadminController.deleteMinhasReservas);

  router.get('/nome', UsuarioadminController.renderNome);

  router.get('/senha', UsuarioadminController.renderSenha);

  router.post('/senha', UsuarioadminController.criarSenha);

    // Rotas que retornam dados em JSON

    router.get('/admin/grafico1:ano',  (req, res) => {
      const ano = req.params.ano;

      conn.query('SELECT MONTH(data_inicio) as mes, COUNT(*) as quantidade FROM tb_reservas WHERE YEAR(data_inicio) = '+ ano +' GROUP BY MONTH(data_inicio)', (error, results, fields) => {
      if (error) {
          console.error('Erro ao realizar a consulta: ' + error.stack);
          return;
      }
      res.json(results);
      });
  });

  router.get('/admin/grafico2',  (req, res) => {
      conn.query(`SELECT tb_quartos.nome_quarto AS nome_quarto, COUNT(*) AS quantidade_reservas
                  FROM tb_reservas
                  JOIN tb_quartos ON tb_reservas.fk_id_quarto = tb_quartos.id_quarto
                  WHERE tb_reservas.data_inicio <= CURDATE() AND tb_reservas.data_fim >= CURDATE()
                  GROUP BY tb_quartos.nome_quarto;`, (error, results, fields) => {
      if (error) {
          console.error('Erro ao realizar a consulta: ' + error.stack);
          return;
      }
      res.json(results);
      });
  });

  router.get('/admin/grafico3',  (req, res) => {
      conn.query(`SELECT YEAR(r.data_inicio) AS ano, q.nome_quarto AS nome_quarto, SUM(r.vlr_tot_reserva) AS soma_vlr_tot_reserva
                  FROM tb_reservas r
                  JOIN tb_quartos q ON r.fk_id_quarto = q.id_quarto
                  GROUP BY YEAR(r.data_inicio), q.nome_quarto
                  ORDER BY YEAR(r.data_inicio) ASC;`, (error, results, fields) => {
      if (error) {
          console.error('Erro ao realizar a consulta: ' + error.stack);
          return;
      }
      res.json(results);
      });
  });

  router.get('/admin/grafico4',  (req, res) => {
      conn.query(`SELECT status_reserva, COUNT(*) AS quantidade_status
                  FROM tb_reservas
                  GROUP BY status_reserva;`, (error, results, fields) => {
      if (error) {
          console.error('Erro ao realizar a consulta: ' + error.stack);
          return;
      }
      res.json(results);
      });
  });

  return router;

};