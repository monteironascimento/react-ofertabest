export function dataExtenso(data: Date) {

    var day = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][data.getDay()];
    var date = data.getDate();
    var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][data.getMonth()];
    var year = data.getFullYear();
    var horario = `${(data.getHours() < 10 ? `0${data.getHours()}` : data.getHours()) }:${(data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes())}`
  
    return `${day}, ${date} de ${month} de ${year} - ${horario}`;
}