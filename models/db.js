'user strict';

var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'mail.akcybex.com',
    port     :  3306,
    user     : 'akcybex',
    password : '@Allahis1@',
    database : 'pdh_estore'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
