let conn = require('./db');
let formidable = require('formidable');
let path = require('path');
let Pagination = require('./Pagination');
let moment = require('moment');

let defaults = {
    title: 'Hotel Ventura',
    headerIndex: false
};

let defaultContato = {
    title: 'Contato - Hotel Ventura',
    header: {
        background: 'images/img_bg_3.jpg',
        title: 'Diga um oi!'
    },
    body: {}
};

let defaultsReservas = {
    title: 'Reserva - Hotel Ventura',
    header: {
        background: 'images/img_bg_2.jpg',
        title: 'Reserve um quarto!'
    },
    body: {}
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
        contatosSave(req, res) {

            let render = (error, success) => {

                res.render('site/contatos', Object.assign({}, defaults, defaultContato, {
                  body: req.body,
                  success,
                  error
                }));
          
            };

            return new Promise((s, f) => {

                if (!req.body.nome) {
                    render('Preencha o campo Nome.');
                } else if (!req.body.email) {
                    render('Preencha o campo E-mail.');
                } else if (!req.body.mensagem) {
                    render('Preencha o campo Mensagem.');
                } else {
                    conn.query(
                    "INSERT INTO tb_contatos (nome, email, mensagem) VALUES(?, ?, ?)",
                    [
                        req.body.nome,
                        req.body.email,
                        req.body.mensagem
                    ],
                    (err, results) => {
                        if (err) {
                        render(err);
                        } else {
                        io.emit('reservations update', req.body);
                        req.body = {};
                        render(null, 'Contato enviado com sucesso!');
                        }}
                    );
                }
            });
        },
        reservasSave(req, res) {

            let render = (error, success) => {

                conn.query(
                "SELECT * FROM tb_quartos ORDER BY tarifa",
                (err, results, fields) => {
                    res.render('site/reservas', Object.assign({}, defaults, defaultsReservas, {
                    quartos: results,
                    body: req.body,
                    success,
                    error        
                    }));
                });
            };

            return new Promise((s, f) => {

                if (!req.body.nome) {
                    render('Preencha o campo Nome.');
                } else if (!req.body.email) {
                    render('Preencha o campo E-mail.');
                } else if (!req.body.qt_hospedes) {
                    render('Selecione a quantidade de pessoas.');
                } else if (!req.body.data_inicio.trim()) {
                    render('Selecione a data de inicio da reserva.');
                } else if (!req.body.data_fim.trim()) {
                    render('Selecione a data fim da reserva.');
                } else if (req.body.data_inicio > req.body.data_fim) {
                    render('Data de início não pode ser maior que data de fim da reserva.');
                } else {
                    const aux_data_inicio = moment(req.body.data_inicio);
                    const aux_data_fim = moment(req.body.data_fim);
                    const diffdatas = aux_data_fim.diff(aux_data_inicio, "days")
                
                    const aux_fk_id_quarto = parseInt(req.body.fk_id_quarto);
                    conn.query(`SELECT tarifa FROM tb_quartos WHERE id_quarto =${aux_fk_id_quarto}`, (err, rows) => {
                        if (err) {
                            render(err);
                        } else {
                            var aux_tarifa = rows[0].tarifa;
                            console.log(aux_tarifa);
                            var vlr_tot_reserva = diffdatas*rows[0].tarifa;
                            console.log(vlr_tot_reserva);
                        }
                        let query, params;

                        query = `
                            INSERT INTO tb_reservas (nome, email, qt_hospedes, data_inicio, data_fim, fk_id_quarto, status_reserva , qt_diarias , vlr_tot_reserva ) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `;
                        params = [
                            req.body.nome,
                            req.body.email,
                            req.body.qt_hospedes,
                            req.body.data_inicio,
                            req.body.data_fim,
                            parseInt(req.body.fk_id_quarto),
                            req.body.status_reserva,
                            diffdatas,
                            vlr_tot_reserva
                        ];
    
                        console.log(params); 
                        
                        conn.query(query, params, (err, results) => {
                            if (err) {
                                render(err);
                            } else {
                
                                io.emit('reservations update', req.body);
                    
                                req.body = {};
                    
                                render(null, 'Reserva realizada com sucesso!');
                            }
                        });
                    });
                }
            });
        }
    }
}