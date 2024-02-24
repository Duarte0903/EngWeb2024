var http = require('http')
var url = require('url')
var axios = require('axios')

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    var q = url.parse(req.url, true)
    res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' })

    if (req.url == "/") {
        res.write("<h2>Escola de Música</h2>")
        res.write("<ul>")
        res.write("<li><a href='/alunos'>Lista de Alunos</a></li>")
        res.write("<li><a href='/cursos'>Lista de Cursos</a></li>")
        res.write("<li><a href='/instrumentos'>Lista de Instrumentos</a></li>")
        res.write("</ul>")
        res.end()
    } 

    else if (req.url == "/alunos") {  // Lista de todos os alunos
        axios.get("http://localhost:3000/alunos?_sort=nome")
            .then((resp) => {
                var data = resp.data

                res.write("<ul>")
                for (i in data) {
                    res.write("<li><a href='/alunos/" + data[i].id + "'>" + data[i].nome + "</a></li>")
                }
                res.write("</ul>")
                res.end()
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }
    
    else if (q.pathname.startsWith("/alunos/")) {  // Pagina de um aluno
        var idAluno = req.url.split("/")[2]
        axios.get("http://localhost:3000/alunos/" + idAluno)
            .then((resp) => {
                aluno = resp.data
                res.write("<h2>Aluno</h2>")
                res.write("<p>Id: " + aluno.id + "</p>")
                res.write("<p>Nome: " + aluno.nome + "</p>")
                res.write("<p>Data de Nascimento: " + aluno.dataNasc + "</p>")
                res.write("<a href='/cursos/" + aluno.curso + "'>Curso: " + aluno.curso + "</a>")
                res.write("<p>Ano: " + aluno.anoCurso + "</p>")
                res.write("<p>Instrumento: " + aluno.instrumento + "</p>")
                res.end()
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }

    else if (req.url == "/cursos") {  // Lista de todos os cursos
        axios.get("http://localhost:3000/cursos?_sort=designacao")
            .then((resp) => {
                var data = resp.data

                res.write("<ul>")
                for (i in data) {
                    res.write("<li><a href='/cursos/" + data[i].id + "'>" + data[i].designacao + "</a></li>")
                }
                res.write("</ul>")
                res.end()
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }

    else if (q.pathname.startsWith("/cursos/")) {  // Pagina de um curso
        var idCurso = req.url.split("/")[2]
        axios.get("http://localhost:3000/cursos/" + idCurso)
            .then((resp) => {
                curso = resp.data
                res.write("<h2>Curso</h2>")
                res.write("<p>Id: " + curso.id + "</p>")
                res.write("<p>Designação: " + curso.designacao + "</p>")
                res.write("<p>Duração: " + curso.duracao + "</p>")
                res.write("<p>Instrumento: " + curso.instrumento["#text"] + "</p>")
                res.end()
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }

    else if (req.url == "/instrumentos") {  // Lista de todos os instrumentos
        axios.get("http://localhost:3000/instrumentos?_sort=%23text")
            .then((resp) => {
                instrumentos = resp.data
                res.write("<h2>Lista de Instrumentos</h2>")
                res.write("<ul>")
                instrumentos.forEach(i => {
                    res.write("<li><p>" + i["#text"] + "</p></li>")
                });
                res.write("</ul>")
                res.end()
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }

    else {
        res.write("Operação não suportada")
        res.end()
    }
}).listen(2002)

console.log("Servidor à escuta na porta 2002");