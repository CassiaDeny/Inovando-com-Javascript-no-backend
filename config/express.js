//retorna uma função não inicializada
var express = require('express');
var load = require('express-load');

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

    //o load carrega os módulos de forma a não ser necessário ficar fazendo require
    //ao mesmo tempo que ele carrega ele também executa o objeto, então se você não quiser isso
    //será necessário fazer um wrapper da sua função, assim como foi feito no connectionFactory
    //a ordem das pastas interferem se uma que depende da outra for carregada primeiro
    //o parâmetro em json cwd indica o diretório onde o express deve procurar os módulos
    //caso não seja informado, ele irá pesquisar no projeto inteiro
    load('infra', { cwd: 'app' }).then('routes').into(app);
    return app;
}