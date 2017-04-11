 var mysql = require('mysql');
 console.log('carregou o módulo de infra');

 var createDBConnection = () => {
     console.log("chamou dentro do factory");
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