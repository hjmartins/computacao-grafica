const Image = require('../util/readImage');
const ProcessamentoImagemUtils = require('../util/ProcessamentoImagemUtils')
const ndarray = require('ndarray');


const mascaras = {
    // sem_mascara: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
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
    const new_image = ndarray(new Array(image.width * image.height), [image.width, image.height]);
    for (let i = 0; i < image1.width; i++) {
        for (let j = 0; i < image1.height; i++) {
            const sum = image1.pixels[i][j] + image2.pixels[i][j]
            sum > 255 ? new_image.set(i, j, 255) : new_image.set(i, j, sum)
        }
    }
    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

function subtracao(image1, image2) {
    const new_image = ndarray(new Array(image.width * image.height), [image.width, image.height]);
    for (let i = 0; i < image1.width; i++) {
        for (let j = 0; i < image1.height; i++) {
            const sub = image1.pixels[i][j] - image2.pixels[i][j]
            sub < 0 ? new_image.set(i, j, 0) : new_image.set(i, j, sub)
        }
    }
    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

function multiplicacao(image1, image2) {
    const new_image = ndarray(new Array(image1.width * image1.height), [image1.width, image1.height]);

    for (let i = 0; i < image1.width; i++) {
        for (let j = 0; j < image1.height; j++) {
            const mult = image1.pixels[i][j] / image2.pixels[i][j];
            if (mult < 0) {
                new_image.set(i, j, 0);
            } else if (mult > 255) {
                new_image.set(i, j, 255);
            } else {
                new_image.set(i, j, mult);
            }
        }
    }

    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

function divisao(image1, image2) {
    const new_image = ndarray(new Array(image1.width * image1.height), [image1.width, image1.height]);

    for (let i = 0; i < image1.width; i++) {
        for (let j = 0; j < image1.height; j++) {
            const div = image1.pixels[i][j] / image2.pixels[i][j];
            if (div < 0) {
                new_image.set(i, j, 0);
            } else if (div > 255) {
                new_image.set(i, j, 255);
            } else {
                new_image.set(i, j, div);
            }
        }
    }

    return new Image(image1.width, image1.height, image1.maxPixelValue, new_image);
}

module.exports = { mascaras, filtros, operacoes };