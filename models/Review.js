'user strict';
var sql = require('./db.js');

//Query object constructor
var Review = function (review) {
    this.user_id = review.user_id;
    this.product_id = review.product_id;
    this.testimonial = review.testimonial;
    this.rating = review.rating;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Review.create = function (newReview, result) {
    sql.query("INSERT INTO reviews set ?", newReview, function (err, res) {
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

Review.getById = function (id, result) {
    sql.query("Select r.*, u.* from reviews r INNER JOIN users u ON r.user_id = u.id where r.id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};


Review.getAll = function (result) {
    sql.query("Select r.*, u.* from reviews r INNER JOIN users u ON r.user_id = u.id", function (err, res) {

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

Review.getByProduct = function (productId, result) {
    sql.query("Select r.*, u.* from reviews r INNER JOIN users u ON r.user_id = u.id where r.product_id = ?", productId, function (err, res) {

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

Review.getByUser = function (userId, result) {
    sql.query("Select r.*, u.* from reviews r INNER JOIN products p ON r.product_id = p.id where r.user_id = ?", userId, function (err, res) {

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

Review.updateById = function(id, user, result){
    sql.query("UPDATE reviews SET name = ? WHERE id = ?", [user.name, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Review.remove = function(id, result){
    sql.query("DELETE FROM reviews WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};


module.exports= Review;
