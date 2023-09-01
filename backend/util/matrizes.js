class Matrizes{

  multiplicaMatriz(matriz1, matriz2) {
    const rows1 = matriz1.length;
    const cols1 = matriz1[0].length;
    const rows2 = matriz2.length;
    const cols2 = matriz2[0].length;
  
    if (cols1 !== rows2) {
      throw new Error('As matrizes não podem ser multiplicadas. O número de colunas da matriz1 deve ser igual ao número de linhas da matriz2.');
    }
  
    const result = [];
    for (let i = 0; i < rows1; i++) {
      result[i] = [];
      for (let j = 0; j < cols2; j++) {
        result[i][j] = 0;
        for (let k = 0; k < cols1; k++) {
          result[i][j] += matriz1[i][k] * matriz2[k][j];
        }
      }
    }
  
    return result;
  }
}
module.exports = new Matrizes()