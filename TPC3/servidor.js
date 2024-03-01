var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');
var pages = require('./pages.js');

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    var q = url.parse(req.url, true)

    if (req.url == '/') {
        fs.readFile('index.html', (erro, dados) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(dados);
            res.end();
        })
    
    // Listagem dos filmes 
    } else if (req.url == '/filmes') {
        axios.get("http://localhost:3000/filmes")
            .then(resp => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(pages.genFilmes(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<p>Erro: " + erro + "</p>");
                res.end();
            })

    // Pagina de um filme
    } else if (q.pathname.match(/\/filmes\/\w+/)) {
        var id = q.pathname.substring(8)
        axios.get("http://localhost:3000/filmes?_id.$oid=" + id)
            .then(resp => {              
                res.write(pages.genPagFilme(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<p>Erro: " + erro + "</p>");
                res.end();
            })
    
    // Listagem dos atores
    } else if (req.url == '/atores') {
        axios.get("http://localhost:3000/atores")
            .then(resp => {
                res.write(pages.genAtores(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<p>Erro: " + erro + "</p>");
                res.end();
            })
    
    // Pagina de um ator
    } else if (q.pathname.match(/\/atores\/\w+([\'|\`\w]+)?/)) {
        var nome = q.pathname.substring(8)
        var nameFormat = nome.replace(/%20/g, " ")
        axios.get("http://localhost:3000/filmes")
            .then(resp => {
                var filmes = resp.data.filter(filme => filme.cast.includes(nameFormat))
                res.write(pages.genPagAtor(nameFormat, filmes));
                res.end();
            })
            .catch(erro => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<p>Erro: " + erro + "</p>");
                res.end();
            })
    
    // Listagem dos generos
    } else if (req.url == '/generos') {
        axios.get("http://localhost:3000/generos")
            .then(resp => {
                res.write(pages.genGeneros(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<p>Erro: " + erro + "</p>");
                res.end();
            })

    // Pagina de um genero
    } else if (q.pathname.match(/\/generos\/(\w+)/)) {
        let gen = q.pathname.substring(9)
        var generoFormat = gen.replace(/%20/g, " ")
        axios.get('http://localhost:3000/filmes')
            .then(resp => {
                var filmes_genero = resp.data.filter(filme => filme.genres.includes(generoFormat))
                res.write(pages.genPagGenero(generoFormat, filmes_genero));
                res.end();
            })
            .catch(erro => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<p>Erro: " + erro + "</p>");
                res.end();
            });

    } else if (req.url == '/w3.css') {
        fs.readFile('w3.css', (erro, dados) => {
            res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
            res.write(dados);
            res.end();
        })
    
    } else {
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<h2>Erro: " + req.url + " não está implementado</h2>");
        res.write("<pre>" + req.url + "</pre>");
        res.end();
    }

}).listen(4000)

console.log('Servidor à escuta na porta 4000...')