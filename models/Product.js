'user strict';
var sql = require('./db.js');
var hat = require('hat');

//Query object constructor
var Product = function (product) {
    this.category_id = product.category_id;
    this.images = product.images;
    this.name = product.name;
    this.description = product.description;
    this.size = product.size;
    this.price = product.price;
    this.stock = product.stock;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Product.create = function (newProduct, result) {
    sql.query("INSERT INTO products set ?", newProduct, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Product.getById = function (id, result) {
    sql.query("Select * from products p INNER JOIN reviews r ON p.id = r.product_id where p.id = ?", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};


Product.getAll = function (result, search = '') {
    sql.query("Select p.*, r.* from products p INNER JOIN reviews r ON p.id = r.product_id where p.name like ?", '%' + search + '%', function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Product.getAllByCategory = function (categoryId, result, search = '') {
    sql.query("Select p.*, r.* from products p INNER JOIN reviews r ON p.id = r.product_id where p.category_id = ? AND name like ? ", [categoryId, '%' + search + '%'], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Product.updateById = function(id, product, result){
    sql.query("UPDATE products SET category_id = ?, images = ?, name = ?, description = ?, size = ?, price = ?, stock = ?, updated_at = ? WHERE id = ?",
        [product.category_id, product.images, product.name, product.description, product.size, product.price, product.stock, product.updated_at, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Product.remove = function(id, result){
    sql.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};


module.exports= Product;
