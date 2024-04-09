var Pessoa = require('../models/pessoa');
var mongoose = require('mongoose');

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome: 1})
        .exec();
}

module.exports.lookUp = id => {
    return Pessoa
        .findOne({_id: id})
        .exec();
}

module.exports.insert = pessoa => {
    pessoa._id = new mongoose.Types.ObjectId();
    return Pessoa.create(pessoa);
}          

module.exports.remove = id => {
    return Pessoa.deleteOne({_id: id});
}

module.exports.update = (id, pessoa) => {
    return Pessoa.updateOne({_id: id}, pessoa);
}