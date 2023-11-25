const express = require('express')

const router = express.Router()

const path = require('path')
const controller2d = require('../controllers/transformacaoFiguras2d.controller')
const controller3d = require('../controllers/transformacaoFiguras3d.controller')
const RecorteTela = require('../controllers/recorteTela.controller')

const URL_BASE = '/recorte';

const TRANSFORMACAO2D = `${URL_BASE}/transformacao-2d`;
const TRANSFORMACAO3D = `${URL_BASE}/transformacao-3d`;
const COHEN_SUTHERLAND = `${URL_BASE}/cohen-sutherland`;


// req should be in format -> [{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...},{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y"},{"pontox": "x", "pontoY": "Y"},...]
router.get(TRANSFORMACAO2D, (req, res, next) => {
	res.send(controller2d.transformaPontos(req))
})

// req should be in format -> [{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...},{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y","pontoz": "z"},{"pontox": "x", "pontoY": "Y","pontoz": "z"},...]
router.get(TRANSFORMACAO3D, (req, res, next) => {
	res.send(controller3d.transformaPontos(req))		
})

router.get(COHEN_SUTHERLAND, (req, res, next) => {
	res.send(RecorteTela.cohenSutherlandClip(req))		
})			

module.exports = router