//retorna uma função não inicializada
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

//invocando a função
var app = express();

module.exports = () => {
    //a declaração do express e seu carregamento foi feito fora, para que ele ocorra apenas uma vez
    //se estivesse aqui dentro, toda vez que fizessemos o require, ele seria carregado de novo

    //o set serve para definir variáveis dentro do express
    //o express tem a string "view engine" para indicar qual é o motor de view a ser utilizado
    app.set('view engine', 'ejs');
    //indica onde ficará a pasta de views, por default, é na raiz da app
    //mas como eu coloquei ela dentro de app/ então preciso informar ao express
    app.set('views', './app/views');

    //o use recebe funções que vão ser aplicadas ao request na ordem q for definida aqui
    //é o que chamamos de middleware
    //que são funções que são aplicadas antes do tratamento da requisição
    //ex.: req -> middleware do bodyparser -> middleware de autenticação -> função que trata a requisição
    //urlencoded é o formato default que o formulário envia os dados (post) para o servidor
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //o load carrega os módulos de forma a não ser necessário ficar fazendo require
    //ao mesmo tempo que ele carrega ele também executa o objeto, então se você não quiser isso
    //será necessário fazer um wrapper da sua função, assim como foi feito no connectionFactory
    //a ordem das pastas interferem se uma que depende da outra for carregada primeiro
    //o parâmetro em json cwd indica o diretório onde o express deve procurar os módulos
    //caso não seja informado, ele irá pesquisar no projeto inteiro
    load('routes', { cwd: 'app' }).then('infra').into(app);
    return app;
}