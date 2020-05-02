var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
/* GET home page. */
router.get('/', function (req, res, next) {

});

/**
 * Authentication
 */
router.post('/login', function (req, res, next) {
    User.getWhereEmailPassword(req.body.email, req.body.password, req.body.is_admin, function (err, result) {
        res.json(result);
    });

});

router.post('/register', function (req, res, next) {
    var _user = new User(req.body);

    User.create(_user, function (err, user) {

        if (err)
            res.send(err);
        res.json(user);
    });

});

/**
 * Categories
 */
router.get('/categories', function (req, res, next) {
    Category.getAll(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });

});

module.exports = router;
