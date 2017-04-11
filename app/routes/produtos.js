module.exports = (app) => {
    //mapeando as rotas
    console.log("carregou módulo de rotas");

    app.get('/produtos', (req, res) => {

        var connection = app.infra.connectionFactory();
        var produtosBanco = app.infra.produtosBanco(connection);

        produtosBanco.lista(function(erros, resultados) {
            res.render('produtos/lista', { lista: resultados });
        });

        connection.end();
    });
}