const ndarray = require('ndarray');
const { mascaras, filtros, operacoes, OperadorMorfologicoBinario, equalizarHistograma } = require('../util/mascaras')
const ProcessamentoImagemUtils = require('../util/ProcessamentoImagemUtils')
const Image = require('../util/readImage')
class FiltroController {
    getImagemFiltrada(image, nomeMascara) {
        image = JSON.parse(image);
        if (mascaras.hasOwnProperty(nomeMascara)) {
            image.pixels = ProcessamentoImagemUtils.applyConvolution(image, mascaras[nomeMascara], false);
        } else if (filtros.hasOwnProperty(nomeMascara)) {
            image.pixels = filtros[nomeMascara](image, false);
        }
        return JSON.stringify(image);
    }

    getOperacaoImagens(image1, image2, operacao) {
        image1 = JSON.parse(image1);
        image2 = JSON.parse(image2);
        if (operacoes.hasOwnProperty(operacao)) {
            const image = image1
            image.pixels = operacoes[operacao](image1, image2);
        }
        return JSON.stringify(image1)
    }

    getOperadorMorfologicoBinario(image1, operacao, mascara, isBinary) {
        image1 = JSON.parse(image1);
        if (OperadorMorfologicoBinario.hasOwnProperty(operacao)) {
            const image = image1
            image.pixels = OperadorMorfologicoBinario[operacao](image1.pixels, mascara, isBinary);
        }
        return JSON.stringify(image1)
    }

    getHistogramaEqualizado(image) {
        const image1 = JSON.parse(image);
        console.log(JSON.stringify(new Image(image1.width, image1.height, image1.maxPixelValue, equalizarHistograma(image1.pixels))))
        return new Image(image1.width, image1.height, image1.maxPixelValue, equalizarHistograma(image1.pixels));
    }
}

module.exports = new FiltroController()