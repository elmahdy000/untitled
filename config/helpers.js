var mysqli = require('mysqli');
var mysql = require('mysql');

let conn = new mysqli({
    host: 'localhost',
    port: '3306',
    user: 'elmahdy',
    password: 'testGoogle123',
    db: 'mega_shop'

});

let db = conn.emit(false, '');

module.exports = {
    database :db
};