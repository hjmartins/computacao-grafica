const express = require('express')

const router = express.Router()

const path = require('path')
controller = require('../controllers/figura.controller')

const RETADDA = '/figura/reta/dda';
const RETAPONTOMEDIO = '/figura/reta/ponto-medio';
const CIRCULOEXPLICITA = '/figura/circulo/equacao-explicita';
const CIRCULOTRIGONOMETRIA = '/figura/circulo/trigonometria';
const CIRCULOPONTOMEDIO = '/figura/circulo/ponto-medio';
const ELIPSEPONTOMEDIO = '/figura/elipse/ponto-medio';

router.get(RETADDA, (req, res, next) => {
	res.send(controller.getRetaDDA())
})

router.get(RETAPONTOMEDIO, (req, res, next) => {
	res.send(controller.getRetaPontoMedio())
})

router.get(CIRCULOEXPLICITA, (req, res, next) => {
	res.send(controller.getCirculoEquacaoExplicita())
})

router.get(CIRCULOTRIGONOMETRIA, (req, res, next) => {
	res.send(controller.getCirculoPontoMedio())
})

router.get(CIRCULOPONTOMEDIO, (req, res, next) => {
	res.send(controller.getCirculoMetodoTrigonometria())
})

router.get(ELIPSEPONTOMEDIO, (req, res, next) => {
	res.send(controller.getElipsePontoMedio())
})

module.exports = router