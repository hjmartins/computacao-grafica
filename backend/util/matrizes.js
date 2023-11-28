class Matrizes{
  identidade(size) {
    const result = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i === j ? 1 : 0);
      }
      result.push(row);
    }
    return result;
  }
  multiplicaMatriz(matrizA, matrizB) {
    const rowsA = matrizA.length;
    const colsA = matrizA[0].length;
    const colsB = matrizB[0].length;
  
    const result = [];
  
    for (let i = 0; i < rowsA; i++) {
      result[i] = [];
      for (let j = 0; j < colsB; j++) {
        result[i][j] = 0;
        for (let k = 0; k < colsA; k++) {
          result[i][j] += matrizA[i][k] * matrizB[k][j];
        }
      }
    }
  
    return result;
  }
}
module.exports = new Matrizes()