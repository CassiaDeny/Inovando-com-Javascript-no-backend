module.exports = () => {
    return (connection) => {
        this.lista = function(callback) {
            connection.query('select * from livros', callback);
        }
        return this;
    }
}