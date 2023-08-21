const express = require('express')

const router = express.Router()

const path = require('path')
const controller = require('../controllers/figura.controller')

const GENERAL_ROUTE = '/figura';

const NDC = `${GENERAL_ROUTE}/ndc`;
const RETADDA = `${GENERAL_ROUTE}/reta/dda`;
const RETAPONTOMEDIO = `${GENERAL_ROUTE}/reta/ponto-medio`;
const CIRCULOEXPLICITA = `${GENERAL_ROUTE}/circulo/equacao-explicita`;
const CIRCULOTRIGONOMETRIA = `${GENERAL_ROUTE}/circulo/trigonometria`;
const CIRCULOPONTOMEDIO = `${GENERAL_ROUTE}/circulo/ponto-medio`;
const ELIPSEPONTOMEDIO = `${GENERAL_ROUTE}/elipse/ponto-medio`;

// get -> `http:localhost:3000${RETADDA}` 

//todos os retornos sao [{pontox1:x, pontoy1:y}, {pontox2:x, pontoy2:y},...]

router.post(NDC, (req, res, next) => {
  const [{   
    yMax: yMax, y: y, yMin: yMin,
    xMax: xMax, x: x, xMin: xMin
  }] = req.body;
  res.send(controller.getNDC(parseInt(yMax), parseInt(y),parseInt(yMin),parseInt(xMax),parseInt(x),parseInt(xMin)))
})

//req should be -> [{"ponto1X": "x1", "ponto1Y": "y1"}, {"ponto2X": "x2", "ponto2Y": "y2"}]
router.post(RETADDA, (req, res, next) => {
  const [{ pontox: pontox1, pontoy: pontoy1 }, { pontox: pontox2, pontoy: pontoy2 }] = req.body;
  res.send(controller.getRetaDDA(parseInt(pontox1), parseInt(pontoy1), parseInt(pontox2), parseInt(pontoy2)))
})

//req should be -> [{"ponto1X": "x1", "ponto1Y": "y1"}, {"ponto2X": "x2", "ponto2Y": "y2"}]
router.post(RETAPONTOMEDIO, (req, res, next) => {
  const [{ pontox: pontox1, pontoy: pontoy1 }, { pontox: pontox2, pontoy: pontoy2 }] = req.body;
	res.send(controller.getRetaPontoMedio(parseInt(pontox1), parseInt(pontoy1), parseInt(pontox2), parseInt(pontoy2)))
})

//req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
router.post(CIRCULOEXPLICITA, (req, res, next) => {
  const [{raio, xOrigem, yOrigem}] = req.body
	res.send(controller.getCirculoEquacaoExplicita(parseInt(raio), parseInt(xOrigem), parseInt(yOrigem)))
})

//req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
router.post(CIRCULOPONTOMEDIO, (req, res, next) => {
  const [{raio, xOrigem, yOrigem}] = req.body
	res.send(controller.getCirculoPontoMedio(parseInt(raio), parseInt(xOrigem), parseInt(yOrigem)))
})

//req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
router.post(CIRCULOTRIGONOMETRIA, (req, res, next) => {
  const [{raio, xOrigem, yOrigem}] = req.body
	res.send(controller.getCirculoMetodoTrigonometria(parseInt(raio), parseInt(xOrigem), parseInt(yOrigem)))
})

//req should be -> [{"ElipseCenter": "centerPos", "MinorRadius": "minorRadioSize"}]
router.post(ELIPSEPONTOMEDIO, (req, res, next) => {
  const [{ElipseCenter, MinorRadius}] = req.body
	res.send(controller.getElipsePontoMedio(parseInt(ElipseCenter), parseInt(MinorRadius)))
})

module.exports = router