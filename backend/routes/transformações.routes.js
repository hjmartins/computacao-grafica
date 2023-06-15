const express = require('express')

const router = express.Router()

const path = require('path')
const controller = require('../controllers/transformacao.controller')

const TRANSFORMACAO2D = '/transformacao-2d';
const TRANSFORMACAO3D = '/transformacao-3d';


// req should be in format -> [{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...},{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y"},{"pontox": "x", "pontoY": "Y"},...]
router.get(TRANSFORMACAO2D, (req, res, next) => {
	res.send(controller.transformaPontos(req))
})

// req should be in format -> [{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...},{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y","pontoz": "z"},{"pontox": "x", "pontoY": "Y","pontoz": "z"},...]
router.get(TRANSFORMACAO3D, (req, res, next) => {
	res.send(controller.transformaPontos(req))
})


module.exports = router