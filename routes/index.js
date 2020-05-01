var express = require('express');
var router = express.Router();
var User = require('../models/User')
/* GET home page. */
router.get('/', function (req, res, next) {
    User.getAll(function (result) {
        res.json(result);
    });

});
/* GET home page. */
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
module.exports = router;
