class Grid {

    constructor(config) {

        config.listeners = Object.assign({
            afterUpdateClick() {
                $(this.options.modalUpdate).modal('show');

            },
            afterReservaClick() {

                $(this.options.modalReserva).modal('show');

            },
            afterFotosClick() {
                $(this.options.modalFotos).modal('show');

            },
            afterDeleteClick() {

                window.location.reload();

            },
            afterFormCreate(){

                window.location.reload();

            },
            afterFormReservaError(){

                alert('Não foi possível enviar o formulário!');

            },
            afterFormCreateError(){

                alert('Não foi possível enviar o formulário!');

            },
            afterFormUpdate() {

                window.location.reload();

            },
            afterFormFotos() {

                window.location.reload();

            },
            afterFormReserva() {

                window.location.reload();

            },
            afterFormUpdateError() {

                alert('Não foi possível enviar o formulário!');

            },
            clickRowButton(btn, row, data, e) {
                console.info('clickRowButton', btn, row, data, e);
            }
        }, config.listeners);

        this.options = Object.assign({}, {
            modalCreate: '#modal-create',
            modalUpdate: '#modal-update',
            modalFotos: '#modal-fotos',
            modalReserva: '#modal-reserva',
            btnReserva: '.btn-reserva',
            btnFotos: '.btn-fotos',
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete',
            textDeleteConfirm: 'Deseja realmente excluir?',
            onUpdateLoad: (formUpdate, name, data) => {
                let input = formUpdate.querySelector(`[name=${name}]`);
                console.log(input);

                if (input) {
                    switch (input.type) {
                        case 'date':
                            input.value = moment(data[name]).format('YYYY-MM-DD');
                            input.setAttribute('value', moment(data[name]).format('YYYY-MM-DD'));
                            break;
                        default:
                            input.value = data[name];
                            input.setAttribute('value', data[name]);
                    }
                }

            },
             onFotosLoad: (formFotos, name, data) => {
                let input = formFotos.querySelector(`[name=${name}]`);
                 console.log(input);
                 console.log(name)
                 console.log(data);

                if (input) {
                    switch (input.type) {
                        case 'date':
                            input.value = moment(data[name]).format('YYYY-MM-DD');
                            input.setAttribute('value', moment(data[name]).format('YYYY-MM-DD'));
                            break;
                        default:
                            input.value = data[name];
                            input.setAttribute('value', data[name]);
                    }
                }

            },
            onReservaLoad: (formReserva, name, data) => {

                let input = formReserva.querySelector(`[name=${name}]`);
                if (input) {
                    switch (input.type) {
                        case 'date':
                            input.value = moment(data[name]).format('YYYY-MM-DD');
                            break;
                        default:
                            
                            input.value = data[name];
                            

                    }
                }

            }
        }, config);

        this.rows = [...document.querySelectorAll(`#${this.options.id} tbody tr`)];

        this.formCreate = document.querySelector(this.options.modalCreate + ' form');
        this.formUpdate = document.querySelector(this.options.modalUpdate + ' form');
        this.formReserva = document.querySelector(this.options.modalReserva + ' form');
        this.formFotos = document.querySelector(this.options.modalFotos + ' form');
        console.log(this.formFotos);
        this.initForms();
        this.initRowButtons();

    }

    fireEvent(name, args) {

        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);

    }

    getTrData(e) {
 
        let path = e.path || (e.composedPath && event.composedPath()) || composedPath(e.target);
        console.log(path);
        if (path) {
       
          let tr = path.find(el => {
       
            return (el.tagName.toUpperCase() === 'TR');
       
          });
            console.log(tr);
            console.log(tr.dataset);
            console.log(tr.dataset.row);
          
          return JSON.parse(tr.dataset.row);
        }
      }

    initForms() {
        if (this.formCreate) {
            this.formCreate.submitAjax({
                success: response => {
                    this.fireEvent('afterFormCreate', [response]);
                },
                failure: (erro) => {
                    console.log(erro);
                    this.fireEvent('afterFormCreateError');
                }
            });
        }

        if (this.formReserva) {
            console.log(this.formReserva)
            this.formReserva.submitAjax({
                success: response => {
                    this.fireEvent('afterFormReserva', [response]);
                },
                failure: () => {
                    this.fireEvent('afterFormReservaError');
                }
            });
        }

        if (this.formUpdate) {
            this.formUpdate.submitAjax({
                
                success: response => {
                    this.fireEvent('afterFormUpdate', [response]);
                },
                failure: () => {
                    this.fireEvent('afterFormUpdateError');
                }
            });
        }

        if (this.formFotos) {
            console.log(this.formFotos)
            this.formFotos.submitAjax({
                
                success: response => {
                    console.log(response)
                    this.fireEvent('afterFormFotos', [response]);
                },
                failure: () => {
                    this.fireEvent('afterFormFotosError');
                }
            });
        }

    }

    initRowButtons() {

        this.rows.forEach(row => {

            [...row.querySelectorAll('.btn')].forEach(btn => {

                btn.addEventListener('click', e => {

                    if (btn.classList.contains('btn-update')) {

                        this.actionBtnUpdate(e);

                    }else if(btn.classList.contains('btn-fotos')) {
                        console.log('btn-fotos')
                        this.actionBtnFotos(e);

                    }
                    else if (btn.classList.contains('btn-delete')) {

                        this.actionBtnDelete(e);

                    }
                    else if (btn.classList.contains('btn-delete-foto')) {

                        this.actionBtnDeleteFoto(e);

                    }else if (btn.classList.contains('btn-reserva')) {

                        this.actionBtnReserva(e);

                    } 
                    else {

                        this.options.listeners.clickRowButton(btn, this.getTrData(e), row, e);

                    }

                });

            });

        });

    }

    actionBtnUpdate(e) {
        this.fireEvent('beforeUpdateClick');

        let data = this.getTrData(e);

        for (let name in data) {

            this.options.onUpdateLoad(this.formUpdate, name, data);

        }

        this.fireEvent('afterUpdateClick');

    }

    actionBtnFotos(e) {
        this.fireEvent('beforeFotosClick');

        let data = this.getTrData(e);

        for (let name in data) {

            this.options.onFotosLoad(this.formFotos, name, data);

        }

        this.fireEvent('afterFotosClick');

    }

    actionBtnReserva(e) {

        this.fireEvent('beforeReservaClick');

        let data = this.getTrData(e);

        for (let name in data) {

            this.options.onReservaLoad(this.formReserva, name, data);

        }

        this.fireEvent('afterReservaClick');

    }

    actionBtnDelete(e) {

        this.fireEvent('beforeDeleteClick');

        let data = this.getTrData(e);

        if (confirm(eval("`" + this.options.textDeleteConfirm + "`"))) {

            let xhr = new XMLHttpRequest();

            xhr.open('DELETE', eval("`" + this.options.urlDelete + "`"), true);

            xhr.onreadystatechange = response => {

                if (xhr.readyState === 4 && xhr.status === 200) {

                    this.fireEvent('afterDeleteClick');

                }

            }

            xhr.send();

        }

    }

    actionBtnDeleteFoto(e) {

        this.fireEvent('beforeDeleteClick');

        let data = this.getTrData(e);

        if (confirm(eval("`" + this.options.textDeleteConfirmFoto + "`"))) {

            let xhr = new XMLHttpRequest();

            xhr.open('DELETE', eval("`" + this.options.urlDeleteFoto + "`"), true);

            xhr.onreadystatechange = response => {

                if (xhr.readyState === 4 && xhr.status === 200) {

                    this.fireEvent('afterDeleteClick');

                }

            }

            xhr.send();

        }

    }

}