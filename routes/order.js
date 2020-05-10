var express = require('express');
var router = express.Router();
var Order = require('../models/Order');

router.get('/', function (req, res, next) {
    if(req.query.user_id){
        Order.getAllByUser(req.query.user_id, function (err, user) {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
    } else {
        Order.getAll(function (err, user) {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
    }


});

router.post('/update', function (req, res, next) {
    Order.updateById(req.body.order_id, req.body.status,function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/place', function (req, res, next) {
    let order = new Order(req.body);
    Order.create(order,function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/delete', function (req, res, next) {

    Order.remove(req.body.coupon_id,function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

module.exports = router;
