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
            res.status(500).send(err);
        else
            res.json(user);
    });

});



/**
 * Designer & User Operations
 */

router.post('/user/add', function (req, res, next) {
    var _user = new User(req.body);
    _user.is_admin = req.body.is_admin;
    User.create(_user, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.get('/user/list/:role', function (req, res, next) {
    User.getAllByRole(req.params.role, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/user/delete', function (req, res, next) {
    User.remove(req.body.user_id, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

module.exports = router;
