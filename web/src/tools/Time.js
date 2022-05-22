
export function retornaTempoPostagem(data){
    const origem = new Date(data);
    const endDate = new Date(); 
    const days = parseInt((endDate - origem) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(endDate - origem) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(origem.getTime() - endDate.getTime()) / (1000 * 60) % 60);

    if(days >30 ){
      if(days === (days/30)){
        return `${(days/30)} Mês`    
      }
      return `${(days/30)} Mêses`  
    }
      
    if(days >0 ){
      if(days === 1){
        return `${days} Dia`    
      }
      return `${days} Dias`  
    }

    if(hours >0 ){
      if(hours === 1){
        return `${hours} Hora`    
      }
      return `${hours} Horas`    
    }

    if(minutes === 1 ){
      return `${minutes} minuto`  
    }

    if(minutes === 0 ){
      return `Alguns segundos`  
    }

    return `${minutes} minutos`
  }
