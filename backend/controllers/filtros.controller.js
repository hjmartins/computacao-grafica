const ndarray = require('ndarray');
const { mascaras, filtros, operacoes } = require('../util/mascaras')
const ProcessamentoImagemUtils = require('../util/ProcessamentoImagemUtils')
const Image = require('../util/readImage')
class FiltroController {
    getImagemFiltrada(image, nomeMascara) {
        image = JSON.parse(image);
        if (mascaras.hasOwnProperty(nomeMascara)) {
            image.pixels = ProcessamentoImagemUtils.convolution(image, mascaras[nomeMascara], false);
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
            image.pixels = operacoes[nomeMascara](image1, image2);
        }
        return JSON.stringify(image1)
    }
}

module.exports = new FiltroController()