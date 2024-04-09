var express = require('express');
var router = express.Router();

const pessoaController = require('../controllers/pessoa');

// GET /pessoas
router.get('/', function (req, res, next) {
  pessoaController.list().then(pessoas => {
      res.render('pessoasList', { title: 'Pessoas', pessoas: pessoas });
  }).catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao obter a lista de pessoas'});
  });
});

// POST /pessoas
router.post('/', function (req, res, next) {
  pessoaController.insert(req.body).then(res.redirect('/pessoas')
  ).catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao inserir pessoas'});
  });
});

// GET /pessoas/add
router.get('/add', function(req, res, next) {
  res.render('pessoaAdd', { title: 'Adicionar pessoa' });
});

// GET /pessoas/:_id
router.get('/:_id', function (req, res, next) {
  pessoaController.lookUp(req.params._id).then(pessoa => {
      res.render('pessoaPage', {title: 'Pessoa', pessoa: pessoa});
  }).catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao obter a pessoa'});
  });
});

// GET /pessoas/delete/:_id
router.get('/delete/:_id', function (req, res, next) {
  pessoaController.remove(req.params._id).then(() => {
      res.redirect('/pessoas');
  }).catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao remover a pessoa'});
  });
});

// GET /pessoas/edit/:_id
router.get('/edit/:_id', function (req, res, next) {
  pessoaController.lookUp(req.params._id).then(pessoa => {
      res.render('pessoaEdit', {title: 'Editar pessoa', pessoa: pessoa});
  }).catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao obter a pessoa'});
  });
});

// POST /pessoas/add
router.post('/add', function(req, res, next) {
  const animaisInput = req.body.animais;
  const animaisList = animaisInput.split(',').map(animal => animal.trim());
  req.body.animais = animaisList;

  const desportosInput = req.body.desportos;
  const desportosList = desportosInput.split(',').map(desporto => desporto.trim());
  req.body.desportos = desportosList;

  const figuraPublicaInput = req.body.figura_publica_pt;
  const figuraPublicaList = figuraPublicaInput.split(',').map(figura => figura.trim());
  req.body.figura_publica_pt = figuraPublicaList;

  const destinosFavoritosInput = req.body.destinos_favoritos;
  const destinosFavoritosList = destinosFavoritosInput.split(',').map(destino => destino.trim());
  req.body.destinos_favoritos = destinosFavoritosList;

  // Adjust checkbox values to boolean
  req.body['atributos.fumador'] = req.body['atributos.fumador'] === 'on';
  req.body['atributos.gosta_cinema'] = req.body['atributos.gosta_cinema'] === 'on';
  req.body['atributos.gosta_viajar'] = req.body['atributos.gosta_viajar'] === 'on';
  req.body['atributos.acorda_cedo'] = req.body['atributos.acorda_cedo'] === 'on';
  req.body['atributos.gosta_ler'] = req.body['atributos.gosta_ler'] === 'on';
  req.body['atributos.gosta_musica'] = req.body['atributos.gosta_musica'] === 'on';
  req.body['atributos.gosta_comer'] = req.body['atributos.gosta_comer'] === 'on';
  req.body['atributos.gosta_animais_estimacao'] = req.body['atributos.gosta_animais_estimacao'] === 'on';
  req.body['atributos.gosta_dancar'] = req.body['atributos.gosta_dancar'] === 'on';

  pessoaController.insert(req.body).then(() => {
    res.redirect('/pessoas');
  }).catch(err => {
    res.render('error', { error: err });
  });
});

// POST /pessoas/edit/:_id
router.post('/edit/:_id', function(req, res, next) {
  const animaisInput = req.body.animais;
  const animaisList = animaisInput.split(',').map(animal => animal.trim());
  req.body.animais = animaisList;

  const desportosInput = req.body.desportos;
  const desportosList = desportosInput.split(',').map(desporto => desporto.trim());
  req.body.desportos = desportosList;

  const figuraPublicaInput = req.body.figura_publica_pt;
  const figuraPublicaList = figuraPublicaInput.split(',').map(figura => figura.trim());
  req.body.figura_publica_pt = figuraPublicaList;

  const destinosFavoritosInput = req.body.destinos_favoritos;
  const destinosFavoritosList = destinosFavoritosInput.split(',').map(destino => destino.trim());
  req.body.destinos_favoritos = destinosFavoritosList;

  // Adjust checkbox values to boolean
  req.body['atributos.fumador'] = req.body['atributos.fumador'] === 'on';
  req.body['atributos.gosta_cinema'] = req.body['atributos.gosta_cinema'] === 'on';
  req.body['atributos.gosta_viajar'] = req.body['atributos.gosta_viajar'] === 'on';
  req.body['atributos.acorda_cedo'] = req.body['atributos.acorda_cedo'] === 'on';
  req.body['atributos.gosta_ler'] = req.body['atributos.gosta_ler'] === 'on';
  req.body['atributos.gosta_musica'] = req.body['atributos.gosta_musica'] === 'on';
  req.body['atributos.gosta_comer'] = req.body['atributos.gosta_comer'] === 'on';
  req.body['atributos.gosta_animais_estimacao'] = req.body['atributos.gosta_animais_estimacao'] === 'on';
  req.body['atributos.gosta_dancar'] = req.body['atributos.gosta_dancar'] === 'on';

  pessoaController.update(req.params._id, req.body).then(() => {
    res.redirect('/pessoas');
  }).catch(err => {
    res.render('error', { error: err });
  });
});

module.exports = router;
