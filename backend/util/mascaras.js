const Image = require('../util/readImage');
const ProcessamentoImagemUtils = require('../util/ProcessamentoImagemUtils')
const ndarray = require('ndarray');


const mascaras = {
    mascara_media: [[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]],
    mascara_passa_alta_basico_1: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
    mascara_passa_alta_basico_2: [[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]],

    robertsX: [[0, 0, 0], [0, 1, 0], [0, 0, -1]],
    robertsY: [[0, 0, 0], [0, 0, 1], [0, -1, 0]],

    sobelX: [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
    sobelY: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],

    prewittX: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
    prewittY: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]],
}

const filtros = {
    mediana: getFiltroMediana,
    robertsXY: robertsXY,
    sobelXY: sobelXY,
    prewittXY: prewittXY,
}

const operacoes = {
    soma: soma,
    subtracao: subtracao,
    multiplicacao: multiplicacao,
    divisao: divisao,
}

const OperadorMorfologicoBinario = {
    "erosao cinza": grayErosion,
    "dilatacao cinza": grayDilation,
    "erosao binaria": binaryErosion,
    "dilatacao binaria": binaryDilation,
    "abertura": binaryOpening,
    "fechamento": binaryClosing,
    "gradiente": binaryGradient,
    "top hat": binaryTopHat,
    "bottom hat": binaryBottomHat,
}

function grayErosion(image, mascara){
    const result = []

    const base = image
    const n = image.length;
    const m = image[0].length;

    for (let i = 0; i < n; i++) {
        const resultLine = [];
        for (let j = 0; j < m; j++) {
            const currPixel = []
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    const row = i + k;
                    const col = j + l;

                    if (row >= 0 && row < n && col >= 0 && col < m) {
                        currPixel.push(base[row][col] - mascara[k + 1][l + 1])
                    }else{
                        currPixel.push(0)
                    }
                }
            }
            const minValue = Math.min(...currPixel);
            resultLine.push(minValue);
        }
        result.push(resultLine);
    }

    return result;
}

function grayDilation(image, mascara){
    const result = []

    const base = image
    const n = image.length;
    const m = image[0].length;

    for (let i = 0; i < n; i++) {
        const resultLine = [];
        for (let j = 0; j < m; j++) {
            const currPixel = []
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    const row = i + k;
                    const col = j + l;

                    if (row >= 0 && row < n && col >= 0 && col < m) {
                        currPixel.push(base[row][col] + mascara[k + 1][l + 1])
                    }else{
                        currPixel.push(0)
                    }
                }
            }
            const minValue = Math.max(...currPixel);
            resultLine.push(minValue);
        }
        result.push(resultLine);
    }

    return result;
}

function binaryErosion(image, mascara) {
    const result = [];

    mascara = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const base = image
    const n = image.length;
    const m = image[0].length;

    let count = 0;
    for (let i = 0; i < n; i++) {
        const resultLine = [];
        for (let j = 0; j < m; j++) {
            count++;
            let coincide = true;

            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    const row = i + k;
                    const col = j + l;

                    if (row >= 0 && row < n && col >= 0 && col < m) {
                        if (mascara[k + 1][l + 1] == 0 && mascara[k + 1][l + 1] !== base[row][col]) {
                            coincide = false;
                            break;
                        }
                    } else {
                        coincide = false;
                        break;
                    }
                }
                if (!coincide) {
                    break;
                }
            }

            if (coincide) {
                resultLine.push(0);
            } else {
                resultLine.push(255);
            }
        }
        result.push(resultLine);
    }

    return result;
}

function binaryDilation(image, mascara) {
    const result = [];
    
    mascara = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    
    const base = image
    const n = image.length;
    const m = image[0].length;

    for(let i = 0; i < n; i++){
        const resultLine = []
        for(let j = 0; j < m; j++){
            resultLine.push(255)
        }
        result.push(resultLine)
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if(mascara[1][1] == 0 && mascara[1][1] == base[i][j]){
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        const row = i + k;
                        const col = j + l;
    
                        if (row >= 0 && row < n && col >= 0 && col < m && mascara[k + 1][l + 1] == 0) {
                            result[row][col] = mascara[k + 1][l + 1]
                        }
                    }
                }
            }
        }
    }

    return result;
}

// Função para realizar a operação de abertura em uma imagem binária
function binaryOpening(image, structuringElement, isBinary) {
    if(isBinary){
        const resultbinaryErosion = binaryErosion(image, structuringElement);
        return binaryDilation(resultbinaryErosion, structuringElement);
    }
    const resultbinaryErosion = grayErosion(image, structuringElement);
    return binaryDilation(resultbinaryErosion, structuringElement);
}

// Função para realizar a operação de fechamento em uma imagem binária
function binaryClosing(image, structuringElement, isBinary) {
    if(isBinary){
        const resultbinaryDilation = binaryDilation(image, structuringElement);
        return binaryErosion(resultbinaryDilation, structuringElement);
    }
    const resultbinaryDilation = grayDilation(image, structuringElement);
    return grayErosion(resultbinaryDilation, structuringElement);
}

// Função para realizar a operação de binaryGradiente em uma imagem binária
function binaryGradient(image, structuringElement, isBinary) {
    if(isBinary){
        const resultbinaryDilation = binaryDilation(image, structuringElement);
        const resultbinaryErosion = binaryErosion(image, structuringElement);
        
        const resultbinaryGradient = [];
        for (let i = 0; i < image.length; i++) {
            resultbinaryGradient[i] = resultbinaryDilation[i] - resultbinaryErosion[i];
        }
        return resultbinaryGradient;        
    }
    const resultGrayDilation = grayDilation(image, structuringElement);
    const resultGrayErosion = grayErosion(image, structuringElement);
    
    const resultgrayGradient = [];
    for (let i = 0; i < image.length; i++) {
        resultgrayGradient[i] = resultGrayDilation[i] - resultGrayErosion[i];
    }
    return resultgrayGradient;        
}

// Função para realizar a operação de top hat em uma imagem binária
function binaryTopHat(image, structuringElement, isBinary) {
    if(isBinary){
        const resultbinaryOpening = binaryOpening(image, structuringElement, true);
    
        // Top Hat é a diferença entre a imagem original e a abertura
        const resultTopHat = [];
        for (let i = 0; i < image.length; i++) {
            resultTopHat[i] = image[i] - resultbinaryOpening[i];
        }
    
        return resultTopHat;
    }
    const resultbinaryOpening = binaryOpening(image, structuringElement, false);
    
    // Top Hat é a diferença entre a imagem original e a abertura
    const resultTopHat = [];
    for (let i = 0; i < image.length; i++) {
        resultTopHat[i] = image[i] - resultbinaryOpening[i];
    }

    return resultTopHat;
}

function binaryBottomHat(image, structuringElement, isBinary) {
    if(isBinary){
        const resultbinaryClosing = binaryClosing(image, structuringElement, true);

        const resultBottomHat = [];
        for (let i = 0; i < image.length; i++) {
            resultBottomHat[i] = resultbinaryClosing[i] - image[i];
        }
    
        return resultBottomHat;
    }
    const resultbinaryClosing = binaryClosing(image, structuringElement, false);

    const resultBottomHat = [];
    for (let i = 0; i < image.length; i++) {
        resultBottomHat[i] = resultbinaryClosing[i] - image[i];
    }

    return resultBottomHat;
}

function robertsXY(image, doNormalize) {
    return ProcessamentoImagemUtils.magnitude(ProcessamentoImagemUtils.applyConvolution(image, mascaras.robertsX, doNormalize), ProcessamentoImagemUtils.applyConvolution(image, mascaras.robertsY, doNormalize), image.width, image.height, doNormalize)
}

function sobelXY(image, doNormalize) {
    return ProcessamentoImagemUtils.magnitude(ProcessamentoImagemUtils.applyConvolution(image, mascaras.sobelX, doNormalize), ProcessamentoImagemUtils.applyConvolution(image, mascaras.sobelY, doNormalize), image.width, image.height, doNormalize)
}

function prewittXY(image, doNormalize) {
    return ProcessamentoImagemUtils.magnitude(ProcessamentoImagemUtils.applyConvolution(image, mascaras.prewittX, doNormalize), ProcessamentoImagemUtils.applyConvolution(image, mascaras.prewittY, doNormalize), image.width, image.height, doNormalize)
}

function getFiltroMediana(image) {
    const new_image = [];
    for (let i = 0; i < image.width; i++) {
        let miniRes = []
        for (let j = 0; j < image.height; j++) {
            miniRes.push(mediana(image.pixels, i, j));
        }
        new_image.push(miniRes)
    }
    return new_image;
}

function mediana(img, x, y) {
    const neighborhood = [];
    const numRows = img.length;
    const numCols = img.length;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < numRows && j >= 0 && j < numCols) {
                // Check if indices are within bounds
                const curr = img[i][j];
                neighborhood.push(curr);
            } else {
                neighborhood.push(0);
            }
        }
    }

    neighborhood.sort((a, b) => a - b);
    return neighborhood[4];
}
function soma(image1, image2) {
    const new_image = [];
    for (let i = 0; i < image1.width; i++) {
        let pixelLine = []
        for (let j = 0; i < image1.height; i++) {
            const sum = image1.pixels[i][j] + image2.pixels[i][j]
            sum > 255 ? pixelLine.push(255) : pixelLine.push(sum)
        }
        new_image.push(pixelLine)
    }
    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

function subtracao(image1, image2) {
    const new_image = [];
    for (let i = 0; i < image1.width; i++) {
        let pixelLine = []
        for (let j = 0; i < image1.height; i++) {
            const sub = image1.pixels[i][j] - image2.pixels[i][j]
            sum > 255 ? pixelLine.push(255) : pixelLine.push(sum)

            sub < 0 ? pixelLine.push( 0) : pixelLine.push( sub)
        }
        new_image.push(pixelLine)
    }
    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

function multiplicacao(image1, image2) {
    const new_image = [];

    for (let i = 0; i < image1.width; i++) {
        let pixelLine = []
        for (let j = 0; j < image1.height; j++) {
            const mult = image1.pixels[i][j] / image2.pixels[i][j];
            if (mult < 0) {
                pixelLine.push( 0);
            } else if (mult > 255) {
                pixelLine.push( 255);
            } else {
                pixelLine.push( mult);
            }
        }
        new_image.push(pixelLine)
    }

    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

function divisao(image1, image2) {
    const new_image = [];

    for (let i = 0; i < image1.width; i++) {
        let pixelLine = []
        for (let j = 0; j < image1.height; j++) {
            const div = image1.pixels[i][j] / image2.pixels[i][j];
            if (div < 0) {
                pixelLine.push( 0);
            } else if (div > 255) {
                pixelLine.push( 255);
            } else {
                pixelLine.push( div);
            }
        }
        new_image.push(pixelLine)
    }

    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

module.exports = { mascaras, filtros, operacoes, OperadorMorfologicoBinario };