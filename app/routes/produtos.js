module.exports = (app) => {
    //mapeando as rotas
    console.log("carregou módulo de rotas");

    app.get('/produtos', (req, res) => {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(erros, resultados) {
            res.render('produtos/lista', { lista: resultados });
        });

        connection.end();
    });

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form');
    });
}