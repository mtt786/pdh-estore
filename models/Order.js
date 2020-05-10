'user strict';
var sql = require('./db.js');
var hat = require('hat');

//Query object constructor
var Order = function (order) {
    this.user_id = order.user_id;
    this.billing_address = order.billing_address;
    this.order_items = order.order_items;
    this.amount = order.amount;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Order.create = function (newOrder, result) {
    sql.query("INSERT INTO orders set ?", newOrder, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Order.getById = function (id, result) {
    sql.query("Select * from orders where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};


Order.getAll = function (result) {
    sql.query("Select * from orders", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Order.getAllByUser = function (userId, result) {
    sql.query("Select * from orders where user_id = ?", userId, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Order.updateById = function (id, status, result) {
    sql.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Order.remove = function (id, result) {
    sql.query("DELETE FROM orders WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};


module.exports = Order;
