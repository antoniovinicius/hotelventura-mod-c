let conn = require("./db");
let formidable = require("formidable");
let path = require("path");
let Pagination = require("./Pagination");
let moment = require("moment");
const crypto = require("crypto");

function genPassword(password) {
  console.log(password);
  var salt = crypto.randomBytes(32).toString("hex");
  var genhash = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return { salt: salt, hash: genhash };
}
function validPassword(password, hash, salt) {
  console.log("Valid Password", password);
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return hash === hashVerify;
}
module.exports = (io) => {
  return {
    login(req) {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_usuarios WHERE email = ?
                `,
          [req.body.email],
          (err, results) => {
            console.log(results);
            if (err) {
              f(err);
            } else if (results.length === 0) {
              f("Usuário e/ou senha incorretos.");
            } else if (!req.body.senha) {
            } else {
              if (
                !validPassword(req.body.senha, results[0].hash, results[0].salt)
              ) {
                f("Usuário e/ou senha incorretos.");
              }
              let user = results[0];
              console.log(user);
              if (
                user.hasOwnProperty("tipo_usuario") &&
                (user.tipo_usuario === "Administrador" ||
                  user.tipo_usuario === "Atendente")
              ) {
                req.session.user = user;

                s(user);
              } else {
                f("Usuário sem permissão");
              }
            }
          }
        );
      });
    },
    home() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT
                        (SELECT COUNT(*) FROM tb_contatos) AS nrcontacts,
                        (SELECT COUNT(*) FROM tb_quartos) AS nrquartos,
                        (SELECT COUNT(*) FROM tb_reservas) AS nrreservations,
                        (SELECT COUNT(*) FROM tb_usuarios) AS nrusers
                `,
          (err, results) => {
            if (err) {
              f(err);
            } else {
              s(results[0]);
            }
          }
        );
      });
    },
    quartos() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_quartos ORDER BY id_quarto
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
    adcionarFotos(req) {
      return new Promise((s, f) => {
        let form = new formidable.IncomingForm({
          multiples: true,
          maxFileSize: 50 * 1024 * 1024, // 5MB
          uploadDir: path.join(__dirname, `../public/images`),
          keepExtensions: true,
        });
        console.log(form)
        form.parse(req, function (err, fields, files) {
           if (err) {
            f(err);
           } else {
             console.log(fields);
             if (fields.id_quarto) {
               console.log(Object.keys(fields).length)
               console.log(files)
               if (files && Object.keys(fields).length > 0) {
                 console.log(files)
                 const fotosInserir = Object.values(files);
                    if (fotosInserir && fotosInserir.length > 0) {
                      console.log(fotosInserir)
                      queryInserir =
                        "INSERT INTO tb_fotos_quartos(foto, fk_id_quarto) VALUES";
                      const valueArray = fotosInserir.length;
                      paramsInserir = [];
                      for (let i = 0; i < valueArray; i++) {
                        if (i === valueArray - 1) {
                          queryInserir += "(?, ?);";
                        } else {
                          queryInserir += "(?, ?),";
                        }
                        paramsInserir.push(
                          "images/" + path.parse(fotosInserir[i].filepath).base
                        );
                        paramsInserir.push(fields.id_quarto);
                      }
                      conn.query(queryInserir, paramsInserir, (err, results) => {
                        console.log(err, results)
                        if (err) {
                          f(err);
                        } else {
                          io.emit("reservations update", fields);
                          s(results)
                        }
                      });
                    }
               } else {
                 f("nenhuma imagem enviada");
               }
             }
          }
        })
      });
    },
    quartosSave(req) {
      return new Promise((s, f) => {
        let form = new formidable.IncomingForm({
          multiples: true,
          maxFileSize: 50 * 1024 * 1024, // 5MB
          uploadDir: path.join(__dirname, `../public/images`),
          keepExtensions: true,
        });
        let update = false;
        form.parse(req, function (err, fields, files) {
          console.log(files)
          
          if (err) {
            f(err);
          } else {
            if (!files.foto) {
              f("A foto não foi enviada!");
            } else {
              fields.foto = "images/" + path.parse(files.foto.filepath).base;

              let query,
                queryFoto = "",
                params = [
                  fields.nome_quarto,
                  fields.descricao,
                  fields.tarifa,
                  fields.metragem,
                  fields.qt_hospedes_quarto,
                ];

              if (parseInt(fields.id_quarto) > 0) {
                if (fields.foto.includes(".")) {
                  queryFoto = ", foto = ?";
                  params.push(fields.foto);
                }

                params.push(fields.id_quarto);
                update = true
                query = `
                        UPDATE tb_quartos
                        SET nome_quarto = ?, descricao = ?, tarifa = ?, metragem = ?, qt_hospedes_quarto = ? ${queryFoto}
                        WHERE id_quarto = ?
                    `;
              } else {
                params.push(fields.foto);

                query = `
                        INSERT INTO tb_quartos (nome_quarto, descricao, tarifa, metragem, qt_hospedes_quarto, foto)
                        VALUES(?, ?, ?, ?, ?, ?)
                        `;
              }

              conn.query(query, params, (err, results) => {
                if (err) {
                  f(err);
                } else {
                  if (update) {
                    delete files.foto;
                  if (files) {
                    const fotosInserir = Object.values(files);
                    if (fotosInserir && fotosInserir.length > 0) {
                      console.log(fotosInserir)
                      queryInserir =
                        "INSERT INTO tb_fotos_quartos(foto, fk_id_quarto) VALUES";
                      const valueArray = fotosInserir.length;
                      paramsInserir = [];
                      for (let i = 0; i < valueArray; i++) {
                        if (i === valueArray - 1) {
                          queryInserir += "(?, ?);";
                        } else {
                          queryInserir += "(?, ?),";
                        }
                        paramsInserir.push(
                          "images/" + path.parse(fotosInserir[i].filepath).base
                        );
                        paramsInserir.push(fields.id_quarto);
                      }
                      conn.query(queryInserir, paramsInserir, (err, results) => {
                        console.log(err, results)
                        if (err) {
                          f(err);
                        }
                      });
                    }
                  }

                  io.emit("reservations update", fields);

                  s(fields, results);
                  } else {
                    delete files.foto;
                  if (files) {
                    const fotosInserir = Object.values(files);
                    if (fotosInserir && fotosInserir.length > 0) {
                      console.log(fotosInserir)
                      queryInserir =
                        "INSERT INTO tb_fotos_quartos(foto, fk_id_quarto) VALUES";
                      const valueArray = fotosInserir.length;
                      paramsInserir = [];
                      for (let i = 0; i < valueArray; i++) {
                        if (i === valueArray - 1) {
                          queryInserir += "(?, ?);";
                        } else {
                          queryInserir += "(?, ?),";
                        }
                        paramsInserir.push(
                          "images/" + path.parse(fotosInserir[i].filepath).base
                        );
                        paramsInserir.push(results.insertId);
                      }
                      conn.query(queryInserir, paramsInserir, (err, results) => {
                        console.log(err, results)
                        if (err) {
                          f(err);
                        }
                      });
                    }
                  }

                  io.emit("reservations update", fields);

                  s(fields, results);
                  }
                  
                }
              });
            }
          }
        });
      });
    },
    quartosDelete(req) {
      return new Promise((s, f) => {
        if (!req.params.id) {
          f("Informe o ID.");
        } else {
          conn.query(
            `
                    DELETE FROM tb_quartos WHERE id_quarto = ?
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
    removerFoto(req) {
      return new Promise((s, f) => {
        if (!req.params.id) {
          f("Informe o ID.");
        } else {
          conn.query(
            `
                    DELETE FROM tb_fotos_quartos WHERE id_foto_quarto = ?
                `,
            [req.params.id],
            (err, results) => {
              if (err) {
                console.log(err);
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
    reservasSave(req) {
      console.log(req.session);

      return new Promise((s, f) => {
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
          const aux_data_inicio = moment(fields.data_inicio);
          const aux_data_fim = moment(fields.data_fim);
          const diffdatas = aux_data_fim.diff(aux_data_inicio, "days");

          const aux_fk_id_quarto = parseInt(fields.fk_id_quarto);
          conn.query(
            `SELECT tarifa FROM tb_quartos WHERE id_quarto =${aux_fk_id_quarto}`,
            (err, rows) => {
              if (err) {
                render(err);
              } else {
                var aux_tarifa = rows[0].tarifa;
                console.log(aux_tarifa);
                var vlr_tot_reserva = diffdatas * rows[0].tarifa;
                console.log(vlr_tot_reserva);
              }

              let query, query_log, params, params_log;

              if (parseInt(fields.id_reserva) > 0) {
                console.log("Entrei aqui");

                query = `
                              UPDATE tb_reservas
                              SET nome = ?, email = ?, qt_hospedes = ?, data_inicio = ?, data_fim = ?, fk_id_quarto = ?, qt_diarias = ?, vlr_tot_reserva = ?
                              WHERE id_reserva = ?
                          `;
                params = [
                  fields.nome,
                  fields.email,
                  fields.qt_hospedes,
                  fields.data_inicio,
                  fields.data_fim,
                  parseInt(fields.fk_id_quarto),
                  diffdatas,
                  vlr_tot_reserva,
                  parseInt(fields.id_reserva),
                ];

                query_log = `
                        INSERT INTO tb_log_reservas (texto_log, data_registro)
                        VALUES (concat('Reserva de id ', ?, ' alterada pelo usuário de nome ', ?, ' de id ', ?), CURRENT_TIMESTAMP());
                      `;
                params_log = [
                  parseInt(fields.id_reserva),
                  req.session.user.nome,
                  req.session.user.id_usuario,
                ];
              } else {
                query = `
                          INSERT INTO tb_reservas (nome, email, qt_hospedes, data_inicio, data_fim, fk_id_quarto, status_reserva , qt_diarias , vlr_tot_reserva ) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                          `;
                params = [
                  fields.nome,
                  fields.email,
                  fields.qt_hospedes,
                  fields.data_inicio,
                  fields.data_fim,
                  parseInt(fields.fk_id_quarto),
                  fields.status_reserva,
                  diffdatas,
                  vlr_tot_reserva,
                ];

                query_log = `
                        INSERT INTO tb_log_reservas (texto_log, data_registro)
                        VALUES (concat('Reserva de id ', ?, ' criada pelo usuário de nome ', ?, ' de id ', ?), CURRENT_TIMESTAMP());
                      `;
                params_log = [
                  parseInt(fields.id_reserva),
                  req.session.user.nome,
                  req.session.user.id_usuario,
                ];
              }
              conn.query(query, params, (err, results) => {
                if (err) {
                  f(err);
                } else {
                  s(fields, results);
                }
              });

              console.log(query_log);
              console.log(params_log);
              conn.query(query_log, params_log, (err, results) => {
                if (err) {
                  f(err);
                } else {
                  s(fields, results);
                }
              });
            }
          );
        });
      });
    },
    alterarStatus(req) {
      return new Promise((s, f) => {
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
          let query, params;

          query = `
                                UPDATE tb_reservas
                                SET status_reserva = ? 
                                WHERE id_reserva = ?
                            `;
          params = [fields.status_reserva, fields.id_reserva];

          conn.query(query, params, (err, results) => {
            if (err) {
              f(err);
            } else {
              io.emit("reservations update", fields);

              s(fields, results);
            }
          });
        });
      });
    },
    reservas(params) {
      return new Promise((s, f) => {
        let pag = new Pagination(
          "SELECT SQL_CALC_FOUND_ROWS * FROM tb_reservas JOIN tb_quartos q on q.id_quarto = fk_id_quarto WHERE data_inicio BETWEEN ? AND ? ORDER BY data_inicio DESC LIMIT ?, ?",
          [params.start, params.end]
        );

        pag
          .getPage(params.page)
          .then((data) => {
            this.quartos().then((quartos) => {
              s({
                data,
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
    reservasChart(params) {
      return new Promise((s, f) => {
        conn.query(
          `
                SELECT CONCAT(YEAR(data_inicio), '-',MONTH(data_inicio)) AS date, COUNT(*) AS total, 
                SUM(qt_hospedes) / COUNT(*) AS avg_people, tq.id_quarto as id, tq.nome_quarto as nome
                FROM tb_reservas
                JOIN tb_quartos tq
                WHERE data_inicio BETWEEN ? AND ?
                GROUP BY YEAR(data_inicio), MONTH(data_inicio), data_inicio, nome, id 
                ORDER BY YEAR(data_inicio), MONTH(data_inicio)
            `,
          [params.start, params.end],
          (err, results) => {
            if (err) {
              f(err);
            } else {
              let months = [];
              let values = [];

              results.forEach((row) => {
                months.push(moment(row.date).format("MMM YYYY"));
                values.push(row.total);
              });

              s({
                months,
                values,
              });
            }
          }
        );
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
    usuarios() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_usuarios ORDER BY id_usuario
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
    usuariosSave(req) {
      return new Promise((s, f) => {
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
          let query, params;

          if (parseInt(fields.id_usuario) > 0) {
            query = `
                                UPDATE tb_usuarios
                                SET nome = ?, email = ?, tipo_usuario = ?
                                WHERE id_usuario = ?
                            `;
            params = [
              fields.nome,
              fields.email,
              fields.tipo_usuario,
              fields.id_usuario,
            ];
          } else {
            let { hash, salt } = genPassword(fields.senha);
            query = `
                                INSERT INTO tb_usuarios (nome, email, hash, salt, tipo_usuario)
                                VALUES(?, ?, ?, ?, ?)
                            `;
            params = [
              fields.nome,
              fields.email,
              hash,
              salt,
              fields.tipo_usuario,
            ];
          }

          conn.query(query, params, (err, results) => {
            if (err) {
              f(err);
            } else {
              io.emit("reservations update", fields);

              s(fields, results);
            }
          });
        });
      });
    },
    usuariosDelete(req) {
      return new Promise((s, f) => {
        if (!req.params.id) {
          f("Informe o ID.");
        } else {
          conn.query(
            `
                    DELETE FROM tb_usuarios WHERE id_usuario = ?
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
    usuariosSenha(req) {
      return new Promise((s, f) => {
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
          console.log(fields);

          if (err) {
            f(err);
          } else {
            if (!fields.senha) {
              f("Preencha a senha.");
            } else if (fields.senha !== fields.senhaConfirm) {
              f("Confirme a senha corretamente.");
            } else {
              const { hash, salt } = genPassword(fields.senha);
              console.log(hash, salt);
              conn.query(
                `
                            UPDATE tb_usuarios SET hash = ?, salt = ? WHERE id_usuario = ?
                        `,
                [hash, salt, fields.id_usuario],
                (err, results) => {
                  if (err) {
                    f(err);
                  } else {
                    s(results);
                  }
                }
              );
            }
          }
        });
      });
    },
    contatos() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_contatos ORDER BY nome
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
    contatosDelete(req) {
      return new Promise((s, f) => {
        if (!req.params.id) {
          f("Informe o ID.");
        } else {
          conn.query(
            `
                    DELETE FROM tb_contatos WHERE id_contato = ?
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
    emails() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_emails ORDER BY email
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
    emailsDelete(req) {
      return new Promise((s, f) => {
        if (!req.params.id) {
          f("Informe o ID.");
        } else {
          conn.query(
            `
                    DELETE FROM tb_emails WHERE id_email = ?
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
    logs() {
      return new Promise((s, f) => {
        conn.query(
          `
                    SELECT * FROM tb_log_reservas ORDER BY data_registro DESC
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
    logsDelete(req) {
      return new Promise((s, f) => {
        if (!req.params.id) {
          f("Informe o ID.");
        } else {
          conn.query(
            `
                    DELETE FROM tb_log_reservas WHERE id_log_reserva = ?
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
    getParametros(req, params) {
      return Object.assign(
        {},
        {
          menus: req.menus,
          user: req.session.user,
        },
        params
      );
    },

    getMenus(req) {
      let menus = [
        {
          text: "Tela Inicial",
          href: "/admin",
          icon: "home",
          active: false,
        },
        {
          text: "Quartos",
          href: "/admin/quartos",
          icon: "cutlery",
          active: false,
        },
        {
          text: "Reservas",
          href: "/admin/reservas",
          icon: "calendar-check-o",
          active: false,
        },
        {
          text: "Contatos",
          href: "/admin/contatos",
          icon: "comments",
          active: false,
        },
        {
          text: "Usuários",
          href: "/admin/usuarios",
          icon: "users",
          active: false,
        },
        {
          text: "E-mails",
          href: "/admin/emails",
          icon: "envelope",
          active: false,
        },
        {
          text: "Logs",
          href: "/admin/logs",
          icon: "",
          active: false,
        },
        {
          text: "Dashboard",
          href: "/admin/dashboard",
          icon: "fa-tachometer",
          active: false,
        },
      ];

      menus.map((menu) => {
        if (menu.href === `/admin${req.url}`) menu.active = true;
      });

      return menus;
    },
  };
};
