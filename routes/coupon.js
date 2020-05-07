var express = require('express');
var router = express.Router();
var Coupon = require('../models/Coupon');

router.get('/', function (req, res, next) {
    Coupon.getAll(function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/add', function (req, res, next) {
    let generate = new Coupon(req.body);
    Coupon.create(generate,function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});


router.post('/delete', function (req, res, next) {

    Coupon.remove(req.body.coupon_id,function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

module.exports = router;
