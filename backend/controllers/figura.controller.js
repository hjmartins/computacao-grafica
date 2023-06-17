class FiguraController {
  
  getRetaDDA(x1,y1,x2,y2){    
    let pontos = []

    let aux

    if(x2 < x1){
      aux = x2
      x2 = x1
      x1 = aux
    }
    if(y2 < y1){
      aux = y2
      y2 = y1
      y1 = aux
    }
    //descobre tamanho da reta
    let length = x2-x1

    //caso a distancia no eixo y seja maior q a distancia no eixo X ela é utilizada
    if(y2-y1 > length){
      length = y2-y1
    }

    //calcula o incremento de X e Y
    let xInc = (x2-x1)/length
    let yInc = (y2-y1)/length

    //define os pontos iniciais e os coloca no ArrayList "pontosReta"
    let x = x1
    let y = y1
    
    pontos.push({pontoX: Math.round(x), pontoY: Math.round(y)})

    //enquanto x for menor que y o algoritmo incrementa a posicao do ponto e o coloca no Arraylist "pontosReta"
    while(x < x2){
      x+=xInc
      y+=yInc

      pontos.push({pontox: Math.round(x), pontoy: Math.round(y)})      
    }
    return pontos
  }

  getRetaPontoMedio(x1,y1,x2,y2){
    let pontos = []

    let auxX1 = x1
    let auxY1 = y1
    let auxX2 = x2
    let auxY2 = y2

    //caso o ponto 1 seja maior q o ponto 2, fazemos a inversao dos pontos
    if(x1 > x2){
      auxX1 = x2
      auxX2 = x1
    }
    if(y1 > y2){
      auxY1 = y2
      auxY2 = y1  
    }

    let dx = auxX2-auxX1
    let dy = auxY2-auxY1

    let m = dy/dx

    let IncE;
    let IncNE;
    let ds;

    if(m < 1 && m > 0){
      IncE = 2 * (dy);
      IncNE = 2 * (dy - dx);
      ds = (2 * dy) - dx;
    }else{
      IncE = 2 * (dx);

      IncNE = 2 * (dx - dy);
      ds = (2 * dx) - dy;
    }

    let d = ds;

    //derivacao da funcao para desenhar a reta em qualquer oitante
    if(m < 1 && m > 0){
      while(auxX1 < auxX2) {
          if (d >= 0) {
              auxX1 += 1;
              auxY1 += 1;
              d += IncNE;

              pontos.push({pontox:auxX1, pontoY:auxY1})
          } else {
              auxX1 += 1;
              d += IncE;

              pontos.push({pontox:auxX1, pontoY:auxY1})
          }
        }
    }else{
        while(auxY1 < auxY2){
            if ( d >= 0 ){
                auxX1 += 1;
                auxY1 += 1;
                d += IncNE;

                pontos.push({pontox:auxX1, pontoY:auxY1})
            }
            else{
                auxY1+=1;
                d+=IncE;

                pontos.push({pontox:auxX1, pontoY:auxY1})
            }
        }
    }

    return pontos
  }

  //colocar parametros
  getCirculoEquacaoExplicita(raio, xOrigem, yOrigem){
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

  //colocar parametros
  getCirculoPontoMedio(raio, xOrigem, yOrigem){
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

  //colocar parametros
  getCirculoMetodoTrigonometria(raio, xOrigem, yOrigem){
    
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

  getElipsePontoMedio(elipseCenter, minorRadius){
      var pontos = [];
  
      var dx, dy, d1, d2, x, y;
      x = 0;
      y = minorRadius;
  
      // Decisao inicial de regiao
      d1 = (minorRadius * minorRadius) - (elipseCenter * elipseCenter * minorRadius) +
          (0.25 * elipseCenter * elipseCenter);
      dx = 2 * minorRadius * minorRadius * x;
      dy = 2 * elipseCenter * elipseCenter * y;
  
      // Para primeira regiao
      while (dx < dy) {
  
          // adicionando pontos baseado na simetria de 4 lados
          pontos.push({ pontox: x, pontoy: y });
          pontos.push({ pontox: x, pontoy: -y });
          pontos.push({ pontox: -x, pontoy: y });
          pontos.push({ pontox: -x, pontoy: -y });
  
          // Checking and updating value of
          // decision parameter based on algorithm
          if (d1 < 0) {
              x++;
              dx = dx + (2 * minorRadius * minorRadius);
              d1 = d1 + dx + (minorRadius * minorRadius);
          } else {
              x++;
              y--;
              dx = dx + (2 * minorRadius * minorRadius);
              dy = dy - (2 * elipseCenter * elipseCenter);
              d1 = d1 + dx - dy + (minorRadius * minorRadius);
          }
      }
  
      // Decision parameter of region 2
      d2 = ((minorRadius * minorRadius) * ((x + 0.5) * (x + 0.5)))
          + ((elipseCenter * elipseCenter) * ((y - 1) * (y - 1)))
          - (elipseCenter * elipseCenter * minorRadius * minorRadius);
  
      // Plotting points of region 2
      while (y >= 0) {
  
          // adicionando pontos baseado na simetria de 4 lados
          pontos.push({ pontox: x, pontoy: y });
          pontos.push({ pontox: -x, pontoy: y });
          pontos.push({ pontox: x, pontoy: -y });
          pontos.push({ pontox: -x, pontoy: -y });
  
          // Checking and updating parameter
          // value based on algorithm
          if (d2 > 0) {
              y--;
              dy = dy - (2 * elipseCenter * elipseCenter);
              d2 = d2 + (elipseCenter * elipseCenter) - dy;
          } else {
              y--;
              x++;
              dx = dx + (2 * minorRadius * minorRadius);
              dy = dy - (2 * elipseCenter * elipseCenter);
              d2 = d2 + dx - dy + (elipseCenter * elipseCenter);
          }
      }
      return pontos;
  }
}

module.exports = new FiguraController()