const db = require('../banco/dbConexao');

module.exports =  class GaleriaModel {
    static getTodos(callback){
        return db.query('select * from galeria_video', callback);
    }

    static getId(id, callback){
        return db.query('select * from galeria_video where id = ?', id, callback);
    }

    static adicionar(dados, callback){
        return db.query('insert into galeria_video (titulo, caminho) values(?, ?)', [dados.titulo, dados.caminho], callback);
    }
}