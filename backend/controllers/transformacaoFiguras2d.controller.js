const matriz = require('../util/matrizes')

class Transformacao{

// req should be in format -> [{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}},{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y"},{"pontox": "x", "pontoY": "Y"},...]
transformaPontos(req) {
  let transformacoes = JSON.parse(req.query.transformacoes);
  let pontosOriginais = req.query.pontosOriginais;

  let m = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];

  // Set matriz2 before the loop
  matriz.defineMatriz2(m);

  transformacoes.forEach(transformacao => {
    const matriz_transformacao = this.getTransformacao(transformacao.tipo_transformacao, transformacao.params);
    matriz.defineMatriz1(m);
    m = matriz.multiplicaMatriz();
    matriz.defineMatriz2(matriz_transformacao);
    m = matriz.multiplicaMatriz();
  });

  let pontosTransformados = pontosOriginais.map(ponto => {
    matriz.defineMatriz1(m);
    const pontoHomogeneo = matriz.multiplicaMatriz([ponto.pontox, ponto.pontoy, 1]);
    const pontoTransformado = {
      pontoX: pontoHomogeneo[0][0] / pontoHomogeneo[0][2],
      pontoY: pontoHomogeneo[0][1] / pontoHomogeneo[0][2],
    };
    return pontoTransformado;
  });

  console.log('Transformed Points:', pontosTransformados);

  return pontosTransformados;
}
  
  getTransformacao(tipo_transformacao, params){
    if(tipo_transformacao === 'translacao'){
      return this.translacao(params.transX,params.transY)
    }
    if(tipo_transformacao === 'rotacao'){
      return this.rotacao(params.angulo)
    }
    if(tipo_transformacao === 'escala'){
      return this.escala(params.escalaX,params.escalaY)
    }
    if(tipo_transformacao === 'cisalhamento'){
      return this.escala(params.fatorCisalhamento,params.direcao)
    }
    if(tipo_transformacao === 'reflexao'){
      return this.rotacao(params.eixo)
    }
  }

  translacao(transX, transY){
    return [[transX, 0, 0], [0, transY, 0], [0, 0, 1]];
  }

  rotacao(angulo){
    let radians = (angulo * Math.PI) / 180;

    let cosO = Math.cos(radians);
    let senO = Math.sin(radians);

    return [[cosO, -senO, 0], [senO, cosO, 0], [0, 0, 1]];
  }

  escala(escalaX,escalaY){
    return [[escalaX, 0, 0], [0, escalaY, 0], [0, 0, 1]];
  }

  cisalhamento(fatorCisalhamento,direcao){
    //cisalhamento em X
    if(direcao === 'x'){
      return [[0, fatorCisalhamento, 0], [0, 1, 0], [0, 0, 1]];
    }
    //cisalhamento em Y
    return [[1, 0, 0], [fatorCisalhamento, 1, 0], [1, 0, 1]];
  }

  reflexao(eixo){
    //reflexao em X
    if(eixo === 'x'){
      return [[1, 0, 0], [0, -1, 0], [0, 0, 1]];
    }
    //reflexao em Y
    return [[-1, 0, 0], [0, 1, 0], [0, 0, 1]];
  }

}

module.exports = new Transformacao()