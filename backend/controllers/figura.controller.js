class FiguraController {
  
  async getRetaDDA(){
    //TODO
  }

  async getRetaPontoMedio(){
    //TODO
  }

  async getCirculoEquacaoExplicita(){
    //TODO
  }

  async getCirculoPontoMedio(){
    let x = 0, y = raio;
    let p_medio, pontos = [];

    pontos.push([x+xOrigem, y+yOrigem]);

    if (Number.isInteger(raio)){
      p_medio = 1-raio;
    }else {
      p_medio = (5/4)-raio;
    } 
      
    while (x <= y) {

      if (p_medio < 0) {
        p_medio += (2*x)+1;
        x += 1;
      } else {
        x += 1;
        y -= 1;
        p_medio += (2*x)-(2*y)+1;
      }

      pontos.push([x+xOrigem, y+yOrigem]);
      pontos.push([-x+xOrigem, y+yOrigem]);
      pontos.push([x+xOrigem, -y+yOrigem]);
      pontos.push([-x+xOrigem, -y+yOrigem]);
      pontos.push([y+xOrigem, x+yOrigem]);
      pontos.push([-y+xOrigem, x+yOrigem]);
      pontos.push([y+xOrigem, -x+yOrigem]);
      pontos.push([-y+xOrigem, -x+yOrigem]);
      
    }
    
    pontos.push({pontox:x, pontoy:y})
  }

  async getCirculoMetodoTrigonometria(){
    //TODO
  }

  async getElipsePontoMedio(){
    //TODO
  }
}

module.exports = new FiguraController()