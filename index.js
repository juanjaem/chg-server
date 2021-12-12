const request = require("request-promise");
const cheerio = require("cheerio");

request("https://www.chguadalquivir.es/saih/LluviaTabla.aspx", (err, resp, html) => {
    const $ = cheerio.load(html);
    const arr = [];

    const lista = $('#ContentPlaceHolder1_GridLluviaTiempoReal tbody').children();

    lista.each(function(i, elem){
        if (i === 0) {
            // No queremos la cabecera de la tabla
            return;
        }
        const fila = $(this, 'tr').children();
        let obj = {
            nombrePunto: fila.eq(0).text(),
            horaActual: fila.eq(1).text(),
            ultimas12horas: fila.eq(2).text(),
            acumuladoHoy: fila.eq(3).text(),
            acumuladoAyer: fila.eq(4).text(),
            unidad: fila.eq(5).text(),
        };
        arr.push(obj);
    });
    
    console.log(arr);
});
