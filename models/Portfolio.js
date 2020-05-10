'user strict';
var sql = require('./db.js');

//Query object constructor
var Portfolio = function (portfolio) {
    this.title = portfolio.title;
    this.user_id = portfolio.user_id;
    this.description = portfolio.description;
    this.images = portfolio.images;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Portfolio.create = function (newPortfolio, result) {
    sql.query("INSERT INTO portfolios set ?", newPortfolio, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Portfolio.getById = function (id, result) {
    sql.query("Select * from portfolios where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};


Portfolio.getAll = function (userId, result) {
    sql.query("Select * from portfolios where user_id = ?", userId, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Portfolio.updateById = function (id, code, result) {
    sql.query("UPDATE portfolios SET code = ? WHERE id = ?", [code, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Portfolio.remove = function (id, result) {
    sql.query("DELETE FROM portfolios WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};


module.exports = Portfolio;
