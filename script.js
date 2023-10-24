function registrarEntrada(){
    const horaInicioPico = document.getElementById("horaInicioPico").value;
    const horaFinalPico = document.getElementById("horaFinalPico").value;
    const horaAtual = document.getElementById("horaAtual").value;
    const sensorEntrada = document.getElementById("sensorEntrada").value;
    const viagemEmAndamento = document.getElementById("viagemEmAndamento").value;
    //Conversão de horas em um objeto do tipo Date
    const horaInicioPicoDate = new Date(`1970-01-01T${horaInicioPico}`);
    const horaFinalPicoDate = new Date(`1970-01-01T${horaFinalPico}`);
    const horaAtualDate = new Date(`1970-01-01T${horaAtual}`);
    let contagemPessoas = parseFloat(document.getElementById("contagemPessoas").textContent);
    let totalPessoas = parseFloat(document.getElementById("totalPessoas").textContent);
    let totalPico = parseFloat(document.getElementById("totalPico").textContent);
    let contador = parseFloat(document.getElementById("contador").textContent);
    if(horaAtualDate>=horaInicioPicoDate && horaAtualDate<=horaFinalPicoDate && sensorEntrada=="sim" && viagemEmAndamento=="sim"){
       /*totalPessoas = contagem + 1;*/
        contagemPessoas = contagemPessoas + contador;
        totalPico += contador
       if(contagemPessoas > totalPessoas){
            totalPessoas = contagemPessoas
        }
    }
    document.getElementById("contagemPessoas").textContent = contagemPessoas.toString();
    document.getElementById("totalPessoas").textContent = totalPessoas.toString();
    document.getElementById("totalPico").textContent = totalPico.toString();
}
function registrarSaida(){
    const horaInicioPico = document.getElementById("horaInicioPico").value;
    const horaFinalPico = document.getElementById("horaFinalPico").value;
    const horaAtual = document.getElementById("horaAtual").value;
    const sensorSaida = document.getElementById("sensorSaida").value;
    const viagemEmAndamento = document.getElementById("viagemEmAndamento").value;
    //Conversão de horas em um objeto do tipo Date
    const horaInicioPicoDate = new Date(`1970-01-01T${horaInicioPico}`);
    const horaFinalPicoDate = new Date(`1970-01-01T${horaFinalPico}`);
    const horaAtualDate = new Date(`1970-01-01T${horaAtual}`);
    let contagemPessoas = parseFloat(document.getElementById("contagemPessoas").textContent);
    let contador = parseFloat(document.getElementById("contador").textContent);
    if(horaAtualDate>=horaInicioPicoDate && horaAtualDate<=horaFinalPicoDate && sensorSaida=="sim" && viagemEmAndamento=="sim" && contagemPessoas > 0){
        contagemPessoas = contagemPessoas - contador; 
    }
    document.getElementById("contagemPessoas").textContent = contagemPessoas.toString();
}


