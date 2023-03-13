let conn = require("./db");
let formidable = require("formidable");
let path = require("path");
let Pagination = require("./Pagination");
let moment = require("moment");
const crypto = require("crypto");

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genhash = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return { salt: salt, hash: genhash };
}

let defaults = {
  title: "Hotel Ventura",
  headerIndex: false,
};

let defaultContato = {
  title: "Contato - Hotel Ventura",
  header: {
    background: "images/img_bg_3.jpg",
    title: "Diga um oi!",
  },
  body: {},
};

let defaultReservas = {
  title: "Reserva - Hotel Ventura",
  header: {
    background: "images/img_bg_2.jpg",
    title: "Reserve um quarto!",
  },
  body: {},
};

let defaultSenha = {
  title: "Administração do Usuário - Hotel Ventura",
  header: {
    background: "images/img_bg_6.jpg",
    title: "Administração do Usuário",
  },
  body: {},
};

module.exports = (io) => {
  return {
    home() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_quartos ORDER BY tarifa
                `,
          (err, results) => {
            if (err) {
              f(err);
            } else {
              s(results);
            }
          }
        );
      });
    },
    quartos() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_quartos ORDER BY tarifa
                `,
          (err, results) => {
            if (err) {
              f(err);
            } else {
              s(results);
            }
          }
        );
      });
    },
    renderQuartos() {
        return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_quartos ORDER BY tarifa
                `,
            (err, quartos) => {
              if (err) {
                f(err);
              } else {
                conn.query(
                `
                          SELECT * FROM tb_fotos_quartos
                      `,
                (erros, fotos) => {
                  if (erros) {
                    f(erros);
                  } else {
                    const data = {quartos, fotos}
                    s(data);
                  }
                }
              );
            }
          }
        );
      });
    },
    contatosSave(req, res) {
      let render = (error, success) => {
        res.render(
          "site/contatos",
          Object.assign({}, defaults, defaultContato, {
            body: req.body,
            success,
            error,
          })
        );
      };

      return new Promise((s, f) => {
        if (!req.body.nome) {
          render("Preencha o campo Nome.");
        } else if (!req.body.email) {
          render("Preencha o campo E-mail.");
        } else if (!req.body.mensagem) {
          render("Preencha o campo Mensagem.");
        } else {
          conn.query(
            "INSERT INTO tb_contatos (nome, email, mensagem) VALUES(?, ?, ?)",
            [req.body.nome, req.body.email, req.body.mensagem],
            (err, results) => {
              if (err) {
                render(err);
              } else {
                io.emit("reservations update", req.body);
                req.body = {};
                render(null, "Contato enviado com sucesso!");
              }
            }
          );
        }
      });
    },
    reservas(req) {
        params = req.query;
         
      return new Promise((s, f) => {
       if (!req.user || !req.user.email) {
          throw Error("Usuario nao esta logado")
        }

        let pag = new Pagination(
          "SELECT SQL_CALC_FOUND_ROWS * FROM tb_reservas JOIN tb_quartos q on q.id_quarto = fk_id_quarto WHERE email = ? ORDER BY data_inicio DESC LIMIT ?, ?",
          [req.user.email]
        );
        pag
          .getPage(params.page)
          .then((results) => {
            this.quartos().then((quartos) => {
              s({
                results,
                quartos,
                total: pag.getTotal(),
                current: pag.getCurrentPage(),
                pages: pag.getTotalPages(),
                nav: pag.getNavigation(params),
              });
            });
          })
          .catch((err) => {
            f(f);
          });
      });
    },

    reservasDelete(req) {
      return new Promise((s, f) => {
        if (!req.params.id) {
          f("Informe o ID.");
        } else {
          conn.query(
            `
                    DELETE FROM tb_reservas WHERE id_reserva = ?
                `,
            [req.params.id],
            (err, results) => {
              if (err) {
                f(err);
              } else {
                io.emit("reservations update");
                s(results);
              }
            }
          );
        }
      });
    },
      reservasSave(req, res) {
      let render = (error, success) => {
        conn.query(
          "SELECT * FROM tb_quartos ORDER BY tarifa",
          (err, results, fields) => {
            res.render(
              "site/reservas",
              Object.assign({}, defaults, defaultReservas, {
                quartos: results,
                body: req.body,
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                success,
                error,
              })
            );
          }
        );
      };
          return new Promise((s, f) => {
        if (!req.body.nome && !req.user.nome) {
          render("Preencha o campo Nome.");
        } else if (!req.body.email && !req.user.email) {
          render("Preencha o campo E-mail.");
        } else if (!req.body.qt_hospedes) {
          render("Selecione a quantidade de pessoas.");
        } else if (!req.body.data_inicio.trim()) {
          render("Selecione a data de inicio da reserva.");
        } else if (!req.body.data_fim.trim()) {
          render("Selecione a data fim da reserva.");
        } else if (req.body.data_inicio > req.body.data_fim) {
          render(
            "Data de início não pode ser maior que data de fim da reserva."
          );
        } else {
          const aux_data_inicio = moment(req.body.data_inicio);
          const aux_data_fim = moment(req.body.data_fim);
          const diffdatas = aux_data_fim.diff(aux_data_inicio, "days");

          const aux_fk_id_quarto = parseInt(req.body.fk_id_quarto);
            conn.query(
              `SELECT tarifa FROM tb_quartos WHERE id_quarto =${aux_fk_id_quarto}`,
              (err, rows) => {
                if (err) {
                  render(err);
                } else {
                  var aux_tarifa = rows[0].tarifa;
                  var vlr_tot_reserva = diffdatas * rows[0].tarifa;
                }
                let query, params;

                query = `
                            INSERT INTO tb_reservas (nome, email, qt_hospedes, data_inicio, data_fim, fk_id_quarto, status_reserva , qt_diarias , vlr_tot_reserva ) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `;
                params = [
                  req.body.nome ? req.body.nome : req.user.nome,
                  req.body.email ? req.body.email : req.user.email,
                  req.body.qt_hospedes,
                  req.body.data_inicio,
                  req.body.data_fim,
                  parseInt(req.body.fk_id_quarto),
                  req.body.status_reserva,
                  diffdatas,
                  vlr_tot_reserva,
                ];

                conn.query(query, params, (err, results) => {
                  if (err) {
                    render(err);
                  } else {
                    io.emit("reservations update", req.body);

                    req.body = {};

                    render(null, "Reserva realizada com sucesso!");
                  }
                });
              }
            );
          
        }
      });
      },
      reservasSaveEdit(req) {


      return new Promise((s, f) => {
          
          let form = new formidable.IncomingForm();

          form.parse(req, function (err, fields, files) {

              const aux_data_inicio = moment(fields.data_inicio);
              const aux_data_fim = moment(fields.data_fim);
              const diffdatas = aux_data_fim.diff(aux_data_inicio, "days")
          
              const aux_fk_id_quarto = parseInt(fields.fk_id_quarto);
              conn.query(`SELECT tarifa FROM tb_quartos WHERE id_quarto =${aux_fk_id_quarto}`, (err, rows) => {
                  if (err) {
                      render(err);
                  } else {
                      var aux_tarifa = rows[0].tarifa;
                      var vlr_tot_reserva = diffdatas*rows[0].tarifa;
                  }

                  let query, query_log, params, params_log;

                  if (parseInt(fields.id_reserva) > 0) {

                      query = `
                              UPDATE tb_reservas
                              SET nome = ?, email = ?, qt_hospedes = ?, data_inicio = ?, data_fim = ?, fk_id_quarto = ?, status_reserva = ?, qt_diarias = ?, vlr_tot_reserva = ?
                              WHERE id_reserva = ?
                          `;
                      params = [
                          fields.nome || req.user.nome,
                          fields.email || req.user.email,
                          fields.qt_hospedes,
                          fields.data_inicio,
                          fields.data_fim,
                          parseInt(fields.fk_id_quarto),
                          "Aguardando aprovação",
                          diffdatas,
                          vlr_tot_reserva,
                          parseInt(fields.id_reserva)
                      ];

                      query_log = `
                        INSERT INTO tb_log_reservas (texto_log, data_registro)
                        VALUES (concat('Reserva de id ', ?, ' alterada pelo usuário de nome ', ?, ' de id ', ?), CURRENT_TIMESTAMP());
                      `;
                      params_log = [
                          parseInt(fields.id_reserva),
                          req.user.nome,
                          req.user.id_usuario
                      ];

                  } else {

                      query = `
                          INSERT INTO tb_reservas (nome, email, qt_hospedes, data_inicio, data_fim, fk_id_quarto, status_reserva , qt_diarias , vlr_tot_reserva ) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                          `;
                      params = [
                          fields.nome || req.user.nome,
                          fields.email || req.user.email,
                          fields.qt_hospedes,
                          fields.data_inicio,
                          fields.data_fim,
                          parseInt(fields.fk_id_quarto),
                          fields.status_reserva,
                          diffdatas,
                          vlr_tot_reserva
                      ];

                      query_log = `
                        INSERT INTO tb_log_reservas (texto_log, data_registro)
                        VALUES (concat('Reserva de id ', ?, ' criada pelo usuário de nome ', ?, ' de id ', ?), CURRENT_TIMESTAMP());
                      `;
                    params_log = [
                        parseInt(fields.id_reserva),
                        req.user.nome,
                        req.user.id_usuario
                    ];
                  }
                  conn.query(query, params, (err, results) => {
                      if (err) {
                          f(err);
                      } else {
                          s(fields, results);
                      }
                  });

                  conn.query(query_log, params_log, (err, results) => {
                      if (err) {
                          f(err);
                      } else {
                          s(fields, results);
                      }
                  });
              });
          });
      });
    },
    emailSave(req, res) {
      return new Promise((s, f) => {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
          if (!fields.email) {
            res.status(400);
            res.send({
              error: "Preencha o campo e-mail.",
            });
          } else {
            conn.query(
              "INSERT INTO tb_emails (email) VALUES(?)",
              [fields.email],
              (err, results) => {
                if (err) {
                  res.status(400);
                  res.send({
                    error: err,
                  });
                } else {
                  io.emit("reservations update", fields);

                  res.send(results);
                }
              }
            );
          }
        });
      });
    },
    nome(req) {
      return new Promise((s, f) => {
        conn.query(
          "SELECT nome FROM tb_usuarios WHERE id_usuario = ?",
          [req.user.id_usuario],
          (err, results) => {
            if (err) {
              f(err);
            } else {
              s(results);
            }
          }
        );
      });
    },
    nomeUpdate(req, res) {

        
      return new Promise((s, f) => {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
          if (!fields.nomenovo) {
            res.status(400);
            res.send({
              error: "Preencha o campo novo nome.",
            });
          } else {
            conn.query(
              "UPDATE tb_usuarios SET nome = ? WHERE id_usuario = ?",
              [fields.nomenovo, req.user.id_usuario],
              (err, results) => {
                if (err) {
                  res.status(400);
                  res.send({
                    error: err,
                  });
                } else {
                  io.emit("reservations update", fields);

                  res.send(results);
                }
              }
            );
          }
        });
      });
    },
    contatosSave(req, res) {
      let render = (error, success) => {
        res.render(
          "site/contatos",
          Object.assign({}, defaults, defaultContato, {
            body: req.body,
            success,
            error,
          })
        );
      };

      return new Promise((s, f) => {
        if (!req.body.nome) {
          render("Preencha o campo Nome.");
        } else if (!req.body.email) {
          render("Preencha o campo E-mail.");
        } else if (!req.body.mensagem) {
          render("Preencha o campo Mensagem.");
        } else {
          conn.query(
            "INSERT INTO tb_contatos (nome, email, mensagem) VALUES(?, ?, ?)",
            [req.body.nome, req.body.email, req.body.mensagem],
            (err, results) => {
              if (err) {
                render(err);
              } else {
                io.emit("reservations update", req.body);
                req.body = {};
                render(null, "Contato enviado com sucesso!");
              }
            }
          );
        }
      });
    },
    senhaSave(req, res) {
      let render = (error, success) => {
        res.render(
          "site/senha",
          Object.assign({}, defaults, defaultSenha, {
            body: req.body,
            isAuthenticated: req.isAuthenticated(),
            success,
            error,
          })
        );
      };

      return new Promise((s, f) => {
        if (!req.body.senha) {
          render("Preencha o campo Nova Senha.");
        } else if (!req.body.senhaConfirm) {
          render("Preencha o campo Confirmar Senha.");
        } else if (req.body.senha != req.body.senhaConfirm) {
          render("Senhas informadas não são iguais.");
        } else {
          const { hash, salt } = genPassword(req.body.senhaConfirm);
          conn.query(
            "UPDATE tb_usuarios SET hash = ?, salt = ? WHERE id_usuario = ?",
            [hash, salt, req.user.id_usuario],
            (err, results) => {
              if (err) {
                render(err);
              } else {
                req.body = {};
                render(null, "Senha atualizada com sucesso!");
              }
            }
          );
        }
      });
    },
  };
};
