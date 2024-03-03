function genFilmes(dados) {
    pagHTML = `
    <html>
        <head>
            <title>Lista de Filmes</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Lista de Filmes</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Título</th>
                    <th>Ano</th>
                </tr>
    `

    dados.forEach(filme => {
        pagHTML += `
        <tr>
            <td><a href="/filmes/${filme._id.$oid}">${filme.title}</a></td>
            <td>${filme.year}</td>
        </tr>
        `
    });

    pagHTML += `
    </table>
    </body>
    </html>
    `
    return pagHTML
}

function genPagFilme(dados) {
    pagHTML = `
    <html>
        <head>
            <title>Filme</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <div class="w3-center w3-container w3-teal">
                <h2>${dados[0]['title']}</h2>
            </div>
            <div class="w3-container">
                <p><b>Ano:</b> ${dados[0]['year']}</p>
                <p><b>Elenco:</b></p>
        `

        for (ator in dados[0]['cast']) {
            pagHTML += "<li><a href='/atores/" + dados[0]['cast'][ator] + "'>" + dados[0]['cast'][ator] + "</a></li>"
        }

        pagHTML += `
            <br>
            <p><b>Géneros:</b></p>
        `

        for (genero in dados[0]['genres']) {
            pagHTML += "<li><a href='/generos/" + dados[0]['genres'][genero] + "'>" + dados[0]['genres'][genero] + "</a></li>"
        }

        pagHTML += `
        </div>
        </body>
    </html>
    `
    return pagHTML
}

function genAtores(dados) {
    pagHTML = `
    <html>
        <head>
            <title>Lista de Atores</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Lista de Atores</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Nome</th>
                </tr>
    `

    dados.forEach(ator => {
        pagHTML += `
        <tr>
            <td><a href="/atores/${ator.nome}">${ator.nome}</a></td>
        </tr>
        `
    });

    pagHTML += `
    </table>
    </body>
    </html>
    `
    return pagHTML

}

function genPagAtor(nameFormat, filmes) {
    pagHTML = `
    <html>
        <head>
            <title>Ator</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <h1 class="w3-container w3-teal w3-center">${nameFormat}</h1>
            <div class="w3-container">
                <p><b>Filme:</b></p>
                <ul>
            `

    for (filme in filmes) {
        pagHTML += `<li><a href="/filmes/${filmes[filme]._id.$oid}">${filmes[filme].title}</a></li>`
    }

    pagHTML += `    
            </ul>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

function genGeneros(dados) {
    pagHTML = `
    <html>
        <head>
            <title>Lista de Géneros</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Lista de Géneros</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Género</th>
                </tr>
    `

    dados.forEach(genero => {
        pagHTML += `
        <tr>
            <td><a href='/generos/${genero.nome}'>${genero.nome}</a></td>
        </tr>
        `
    });

    pagHTML += `
    </table>
    </body>
    </html>
    `
    return pagHTML
}

function genPagGenero(generoFormat, filmes_genero) {
    pagHTML = `
    <html>
        <head>
            <title>Género</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <div class="w3-center w3-container w3-teal">
                <h2>${generoFormat}</h2>
            </div>
            <div class="w3-container">
                <h3>Filmes:</h3>
                <ul>
    `

    for (filme in filmes_genero) {
        pagHTML += `<li><a href="/filmes/${filmes_genero[filme]._id.$oid}">${filmes_genero[filme].title}</a></li>`
    }

    pagHTML += `
                </ul>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


module.exports = {
    genFilmes: genFilmes,
    genPagFilme: genPagFilme,
    genAtores: genAtores,
    genPagAtor: genPagAtor,
    genGeneros: genGeneros,
    genPagGenero: genPagGenero
  };