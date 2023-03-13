var globalDias = 0;
var globalValorTarifa = 0;

function atualizaInfos() {
    if ((globalDias > 0) && (globalValorTarifa > 0)) {
        console.log(document.getElementById('qtdDiarias'))
        document.getElementById('qtdDiarias').innerHTML = globalDias;
        var valorReserva = globalValorTarifa*globalDias;
        document.getElementById('valorReserva').innerHTML = valorReserva.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

function editReserva() {
    console.log('editReserva')
    var data1 = new Date(document.getElementById('inputDataInicioCreateEdit').value);
    var data2 = new Date(document.getElementById('inputDataFimCreateEdit').value);
    var diffTime = Math.abs(data2 - data1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffDays)
    globalDias = diffDays;
    recuperaTarifaEdit() 
}

function recuperaTarifaEdit() {
    console.log('recuperaTarifaedit')
    console.log(globalDias)
    var sel = document.getElementById('inputQuartoEdit');
    var text = sel.options[sel.selectedIndex].text;
    var tarifa = text.split("R$");
    globalValorTarifa = parseFloat(tarifa[1]);
    console.log(globalValorTarifa);
    atualizaInfosEdit();
}


function atualizaInfosEdit() {
   
    if ((globalDias > 0) && (globalValorTarifa > 0)) {
        document.getElementById('qtdDiariasEdit').value = globalDias;
        var valorReserva = globalValorTarifa*globalDias;
        document.getElementById('valorReservaEdit').value = valorReserva.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

function calcQtdDias() {
    
    var data1 = new Date(document.getElementById('inputDataFimCreate').value);
    var data2 = new Date(document.getElementById('inputDataInicioCreate').value);
    var diffTime = Math.abs(data2 - data1);
 
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    globalDias = diffDays;
    atualizaInfos();
}

function recuperaTarifa(sel) {
    var sel = document.getElementById('inputQuarto');
    var text = sel.options[sel.selectedIndex].text;
    var tarifa = text.split("R$");
    globalValorTarifa = parseFloat(tarifa[1]);
    atualizaInfos();
}