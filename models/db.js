'user strict';

var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'prohub-estore-do-user-6209218-0.a.db.ondigitalocean.com',
    port     :  25060,
    user     : 'doadmin',
    password : 'ujeazrblaxqi8jfq',
    database : 'pdh_estore'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
