var ProdutosDAO = function(connection) {
    //por convenção, propriedades indicadas com _ seriam tratadas como privadas
    //o programador até tem acesso a ela fora do módulo, mas por convenção não deve usá-la
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from livros;', callback);
}

ProdutosDAO.prototype.salva = function(produto, callback) {
    this._connection.query('insert into livros set ?', produto, callback);
}

module.exports = function() {
    return ProdutosDAO;
}