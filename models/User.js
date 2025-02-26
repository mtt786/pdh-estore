'user strict';
var sql = require('./db.js');
var hat = require('hat');

//Query object constructor
var User = function (user) {
    this.name = user.name;
    this.image = user.image;
    this.email = user.email;
    this.skills = user.skills;
    this.experience = user.experience;
    this.password = user.password;
    this.api_token = hat();
    this.created_at = new Date();
    this.updated_at = new Date();
};

User.create = function (newUser, result) {
    sql.query("INSERT INTO users set ?", newUser, function (err, res) {
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

User.getById = function (id, result) {
    sql.query("Select * from users where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

User.getWhereEmailPassword = function (email, password, is_admin, result) {
    sql.query("Select * from users where email = ? AND password = ? AND is_admin = ? limit 1", [email, password, is_admin], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else{
            result(null, res);
        }
    });
};

User.getAll = function (result) {
    sql.query("Select * from users", function (err, res) {

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

User.getAllByRole = function (role, result) {
    sql.query("Select * from users where is_admin = ?", [role], function (err, res) {

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

User.updateSkillsById = function(id, skills, result){
    sql.query("UPDATE users SET skills = ? WHERE id = ?", [skills, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.updatePasswordById = function(id, password, result){
    sql.query("UPDATE users SET password = ? WHERE id = ?", [password, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.remove = function(id, result){
    sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};


module.exports= User;
