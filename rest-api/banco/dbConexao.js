const mysql = require('mysql');

let conexao = mysql.createPool({
    host     : 'localhost',
    //port     : XXX,
    user     : 'root',
    password : 'usbw',
    database : 'db_galeria_video'
  });

  module.exports = conexao;