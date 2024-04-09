var express = require('express');
var router = express.Router();

var modalidadesController = require('../controllers/modalidades');

// GET /modalidades
router.get('/', function (req, res, next) {
    modalidadesController.list()
    .then(modalidades => {
        res.render('modalidadesList', { title: 'Modalidades', modalidades: modalidades });
    }).catch(erro => {
        res.render('error', {error: erro, message: 'Erro ao obter a lista de modalidades'});
    });
});

// GET /modalidades/:modalidade
router.get('/:modalidade', function (req, res, next) {
    modalidadesController.lookUp(req.params.modalidade)
    .then(pessoas => {
        res.render('modalidade', {title: 'Pessoas com a modalidade ' + req.params.modalidade, pessoas: pessoas});
    }).catch(erro => {
        res.render('error', {error: erro, message: 'Erro ao obter a lista de pessoas com a modalidade ' + req.params.modalidade});
    });
});

module.exports = router;