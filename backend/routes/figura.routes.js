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

// get -> `http:localhost:3000${RETADDA}` 

//todos os retornos sao [{pontox1:x, pontoy1:y}, {pontox2:x, pontoy2:y},...]

//req should be -> [{"ponto1X": "x1", "ponto1Y": "y1"}, {"ponto2X": "x2", "ponto2Y": "y2"}]
router.get(RETADDA, (req, res, next) => {
  const [{ponto1X, ponto1Y}, {ponto2X, ponto2Y}] = JSON.parse(req)
	res.send(controller.getRetaDDA(ponto1X, ponto1Y, ponto2X, ponto2Y))
})

//req should be -> [{"ponto1X": "x1", "ponto1Y": "y1"}, {"ponto2X": "x2", "ponto2Y": "y2"}]
router.get(RETAPONTOMEDIO, (req, res, next) => {
	res.send(controller.getRetaPontoMedio(req, res))
})

//req should be -> [{"raio": "r"}]
router.get(CIRCULOEXPLICITA, (req, res, next) => {
	res.send(controller.getCirculoEquacaoExplicita(req, res))
})

//req should be -> [{"raio": "r"}]
router.get(CIRCULOTRIGONOMETRIA, (req, res, next) => {
	res.send(controller.getCirculoPontoMedio())
})

//req should be -> [{"raio": "r"}]
router.get(CIRCULOPONTOMEDIO, (req, res, next) => {
	res.send(controller.getCirculoMetodoTrigonometria(req))
})

//req should be -> [{"ElipseCenter": "centerPos", "MinorRadius": "minorRadioSize"}]
router.get(ELIPSEPONTOMEDIO, (req, res, next) => {
	res.send(controller.getElipsePontoMedio(req))
})

module.exports = router