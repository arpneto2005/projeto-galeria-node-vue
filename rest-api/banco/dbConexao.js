const mysql = require('mysql');

let conexao = mysql.createPool({
    host     : 'localhst',
    //port     : XXX,
    user     : 'root',
    password : 'usbw',
    database : 'db_galeria_video'
  });

  module.exports = conexao;