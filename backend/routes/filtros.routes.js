const express = require('express')
const router = express.Router()
const controller = require('../controllers/filtros.controller')

const IMAGEMFILTRADA = '/filtro/imagem-filtrada';
const OPERACOESIMAGENS = '/filtro/operacoes-imagem';

//req should be -> [{"image": "image.jpeg"}]
router.post(IMAGEMFILTRADA, (req, res, next) => {
    // const [{ image, nomeMascara }] = JSON.parse(req.body)
    res.send(controller.getImagemFiltrada(req.body.image, req.body.nomeMascara))
})

router.post(OPERACOESIMAGENS, (req, res, next) => {
    const [{ image1, image2, operacao }] = JSON.parse(req.body)
    res.send(controller.getOperacaoImagens(image1, image2, operacao))
})

module.exports = router