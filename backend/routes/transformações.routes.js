const express = require('express')

const router = express.Router()

const path = require('path')
controller = require('../controllers/transformacao.controller')

const TRANSFORMACAO = '/transformacao';


// req should be in format -> [{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...},{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y"},{"pontox": "x", "pontoY": "Y"},...]
router.get(TRANSFORMACAO, (req, res, next) => {
	res.send(controller.transformaPontos(req))
})


module.exports = router