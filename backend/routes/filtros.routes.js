const express = require('express')
const router = express.Router()
const controller = require('../controllers/filtros.controller')

const IMAGEMFILTRADA = '/filtro/imagem-filtrada';
const OPERACOESIMAGENS = '/filtro/operacoes-imagem';
const OPERACOESMORFOLOGICASBINARIO = '/filtro/operacoes-morfologicas-binario';
const OPERACOESMORFOLOGICASCINZA = '/filtro/operacoes-morfologicas-cinza';

//req should be -> [{"image": "image.jpeg"}]
router.post(IMAGEMFILTRADA, (req, res, next) => {
    // const [{ image, nomeMascara }] = JSON.parse(req.body)
    res.send(controller.getImagemFiltrada(req.body.image, req.body.nomeMascara))
})

router.post(OPERACOESIMAGENS, (req, res, next) => {
    res.send(controller.getOperacaoImagens(req.body.image1, req.body.image2, req.body.nomeMascara))
})

router.post(OPERACOESMORFOLOGICASBINARIO, (req, res, next) => {
    res.send(controller.getOperadorMorfologicoBinario(req.body.image, req.body.operacao, req.body.mascara, req.body.isBinary))
})

router.post(OPERACOESMORFOLOGICASCINZA, (req, res, next) => {
    res.send(controller.getOperadorMorfologicoCinza(req.body.image, req.body.nomeMascara))
})

module.exports = router