/*var users = require('./users'),
    posts = require('./posts');

module.exports = {
    users: users,
    posts: posts,
};*/
var modelo = require('./maping');

module.exports = {
    Clientes  : modelo.Clientes,
    Compras   : modelo.Compras,
    Sedes     : modelo.Sedes,
    Productos : modelo.Productos,
    Log       : modelo.Log,
    Sequelize : modelo.sequelize
};
