 var mysql = require('mysql');
 console.log('carregou o módulo de infra');

 var createDBConnection = () => {
     console.log("Criou conexão com o DB");
     return mysql.createConnection({
         host: 'localhost',
         user: 'admin',
         password: 'admin',
         database: 'teste_alura'
     });
 }

 //wrapper para o createDBConnection não ser executada quando o Load carregar o módulo
 module.exports = () => {
     return createDBConnection;
 }