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
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>${dados.title}</h2>
            </div>
            <div class="w3-container">
                <p><b>Ano:</b> ${dados.year}</p>
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
            <td><a href="/atores/${ator.id}">${ator.nome}</a></td>
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

function genPagAtor(dados) {
    pagHTML = `
    <html>
        <head>
            <title>Ator</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>${dados.nome}</h2>
            </div>
            <div class="w3-container">
                <p><b>Id:</b> ${dados.id}</p>
                <p><b>Nome:</b> ${dados.nome}</p>
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
                    <th>ID</th>
                </tr>
    `

    dados.forEach(genero => {
        pagHTML += `
        <tr>
            <td><a href='/generos/${genero.id}'>${genero.nome}</a></td>
            <td>${genero.id}</td>
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

function genPagGenero(dados, filmes) {
    pagHTML = `
    <html>
        <head>
            <title>Género</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>${dados.nome}</h2>
            </div>
            <div class="w3-container">
                <p><b>ID:</b> ${dados.id}</p>
                <p><b>Nome:</b> ${dados.nome}</p>
            </div>
            <div class="w3-container">
                <h3>Filmes:</h3>
                <ul>
    `

    filmes.forEach(filme => {
        pagHTML += `
        <li><a href="/filmes/${filme._id.$oid}">${filme.title}</a></li>
        `
    });

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