'user strict';
var sql = require('./db.js');

//Query object constructor
var Category = function (review) {
    this.name = review.name;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Category.create = function (newCategory, result) {
    sql.query("INSERT INTO categories set ?", newCategory, function (err, res) {
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

Category.getById = function (id, result) {
    sql.query("Select * from categories where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};


Category.getAll = function (result) {
    sql.query("Select * from categories", function (err, res) {

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

Category.updateById = function(id, user, result){
    sql.query("UPDATE categories SET name = ? WHERE id = ?", [user.name, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Category.remove = function(id, result){
    sql.query("DELETE FROM categories WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};


module.exports= Category;
