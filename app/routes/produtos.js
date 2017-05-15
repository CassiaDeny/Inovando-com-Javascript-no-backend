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
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    });

    app.post('/produtos', (req, res) => {

        const produto = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            preco: req.body.preco
        };

        //validação dos dados
        req.assert('titulo', 'Título do produto é obrigatório!').notEmpty();
        req.assert('descricao', 'Descrição do produto é obrigatória').notEmpty();
        req.assert('preco', 'Preço com formato inválido!').isFloat();

        var erros = req.validationErrors();
        if (erros) {

            res.format({
                'html': () => {
                    res.status(400).render('produtos/form', { errosValidacao: erros, produto: produto });
                },
                'json': () => {
                    res.status(400).json(erros);
                }
            });
            console.log(res.status);
            return;
        }

        console.log(req.body);

        const connection = app.infra.connectionFactory();
        const produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, function(erros, resultados) {
            //é indicado sempre redirecionar depois de um post
            //pois no caso de um F5, os dados do formulário será resubmetido
            console.log(resultados);
            res.redirect('/produtos');
        });
    })

}