'user strict';

var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'username',
    password : 'password',
    database : 'dbname'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
