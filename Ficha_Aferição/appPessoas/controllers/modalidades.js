const mongoose = require('mongoose')
var Pessoas = require("../models/pessoa")

module.exports.list = () => {
    return Pessoas.distinct("desportos").then(modalidades => { 
        modalidades.sort();
        return modalidades;
    });
}

module.exports.lookUp = modalidade => {
    return Pessoas.find({desportos: {$in: modalidade}})
    .then(pessoas => {
        return pessoas.sort();
    });
}
