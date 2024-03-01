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

    // Pagina de um filme (Nao funciona)
    } else if (q.pathname.startsWith("/filmes/")) {
        var id = req.url.split("/")[2];
        axios.get("http://localhost:3000/filmes/" + id)
            .then((resp) => {              
                res.write(pages.genPagFilme(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<p>Erro: " + erro + "</p>");
                res.end();
            })
    
    // Listagem dos atores (Meter mais informacao e melhorar pagina)
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

    } else if (q.pathname.startsWith("/atores/")) {
        var id = req.url.split("/")[2];
        axios.get("http://localhost:3000/atores/" + id)
            .then((resp) => {
                res.write(pages.genPagAtor(resp.data));
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

    // Pagina de um genero (Nao funciona)
    } else if (q.pathname.startsWith("/generos/")) {
        var id = req.url.split("/")[2];
        filmes_genero = axios.get("http://localhost:3000/filmes?genre=" + id);
        console.log(filmes_genero);
        axios.get("http://localhost:3000/generos/" + id)
            .then((resp) => {
                res.write(pages.genPagGenero(resp.data, filmes_genero.data));
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