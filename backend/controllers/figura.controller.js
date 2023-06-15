class FiguraController {
  
  async getRetaDDA(){
    //TODO
  }

  async getRetaPontoMedio(){
    //TODO
  }

  async getCirculoEquacaoExplicita(){
    let x = 0;
    let y = raio;
    let pontos = [];
    
    pontos.push([x + xOrigem, y + yOrigem]);
    
    while (x <= y) {
      x++;
      y = Math.sqrt(raio * raio - x * x);
      
      const pontosSimetricos = [
        [x, y],
        [-x, y],
        [x, -y],
        [-x, -y],
        [y, x],
        [-y, x],
        [y, -x],
        [-y, -x]
      ];
    
      pontosSimetricos.forEach(([pontoX, pontoY]) => {
        pontos.push([pontoX + xOrigem, pontoY + yOrigem]);
      });
    }
    
    pontos.push({ pontox: x - 1, pontoy: y });

    return pontos;
  }

  async getCirculoPontoMedio(){
    const pontos = [];
    let x = 0;
    let y = raio;
    let p_medio;
    
    pontos.push([x + xOrigem, y + yOrigem]);
    
    if (Number.isInteger(raio)) {
      p_medio = 1 - raio;
    } else {
      p_medio = (5 / 4) - raio;
    }
    
    while (x <= y) {
      if (p_medio < 0) {
        const incrementoX = x + 1;
        p_medio += 2 * incrementoX + 1;
        x = incrementoX;
      } else {
        const incrementoX = x + 1;
        const decrementoY = y - 1;
        p_medio += 2 * (incrementoX - decrementoY);
        x = incrementoX;
        y = decrementoY;
      }
    
      const pontosSimetricos = [
        [x, y],
        [-x, y],
        [x, -y],
        [-x, -y],
        [y, x],
        [-y, x],
        [y, -x],
        [-y, -x]
      ];
    
      pontosSimetricos.forEach(([pontoX, pontoY]) => {
        pontos.push([pontoX + xOrigem, pontoY + yOrigem]);
      });
    }
    
    pontos.push({ pontox: x - 1, pontoy: y });

    return pontos;
  }

  async getCirculoMetodoTrigonometria(){
    
    const incrementoAngulo = Math.PI / 180;
    const pontos = [];
    
    for (let angulo = 0; angulo <= 2 * Math.PI; angulo += incrementoAngulo) {
      const x = xOrigem + raio * Math.cos(angulo);
      const y = yOrigem + raio * Math.sin(angulo);
      pontos.push([x, y]);
    }
    
    const ultimoPonto = pontos[pontos.length - 1];
    pontos.push({ pontox: ultimoPonto[0], pontoy: ultimoPonto[1] });
    
  }

  async getElipsePontoMedio(){
    //TODO
  }
}

module.exports = new FiguraController()