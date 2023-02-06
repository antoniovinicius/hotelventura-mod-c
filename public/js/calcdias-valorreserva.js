var globalDias = 0;
var globalValorTarifa = 0;

function atualizaInfos() {
    console.log("atualizaInfos");
    console.log(globalDias);
    console.log(globalValorTarifa);
    if ((globalDias > 0) && (globalValorTarifa > 0)) {
        document.getElementById('qtdDiarias').innerHTML = globalDias;
        var valorReserva = globalValorTarifa*globalDias;
        document.getElementById('valorReserva').innerHTML = valorReserva.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

function calcQtdDias() {
    var data1 = new Date(document.getElementById('inputDataFimCreate').value);
    var data2 = new Date(document.getElementById('inputDataInicioCreate').value);
    var diffTime = Math.abs(data2-data1);
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