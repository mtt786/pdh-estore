'user strict';
var sql = require('./db.js');
var hat = require('hat');

//Query object constructor
var Coupon = function (coupon) {
    var cp = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
        cp += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.title = coupon.title;
    this.code = coupon.code ? coupon.code : cp;
    this.discount = coupon.discount;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Coupon.create = function (newCoupon, result) {
    sql.query("INSERT INTO coupons set ?", newCoupon, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Coupon.getById = function (id, result) {
    sql.query("Select * from coupons where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

Coupon.getByCode = function (code, result) {
    sql.query("Select * from coupons where code = ? ", code, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

Coupon.getAll = function (result) {
    sql.query("Select * from coupons", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Coupon.updateById = function (id, code, result) {
    sql.query("UPDATE coupons SET code = ? WHERE id = ?", [code, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Coupon.remove = function (id, result) {
    sql.query("DELETE FROM coupons WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};


module.exports = Coupon;
