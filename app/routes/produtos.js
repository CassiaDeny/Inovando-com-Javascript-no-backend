module.exports = (app) => {
    //mapeando as rotas
    console.log("carregou módulo de rotas");

    app.get('/produtos', (req, res) => {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(erros, resultados) {
            res.format({
                'html': () => {
                    res.render('produtos/lista', { lista: resultados });
                },
                'json': () => {
                    res.json(resultados);
                }
            });
        });

        connection.end();
    });

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form');
    });

    app.post('/produtos', (req, res) => {

        const connection = app.infra.connectionFactory();
        const produtosDAO = new app.infra.ProdutosDAO(connection);
        const produto = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            preco: req.body.preco
        };

        produtosDAO.salva(produto, function(erros, resultados) {
            //é indicado sempre redirecionar depois de um post
            //pois no caso de um F5, os dados do formulário será resubmetido
            res.redirect('/produtos');
        });
    })
}