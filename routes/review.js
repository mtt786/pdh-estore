var express = require('express');
var router = express.Router();
var Review = require('../models/Review');

router.get('/', function (req, res, next) {
    Review.getAll(function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/add', function (req, res, next) {
    let review = new Review(req.body);
    Review.create(review,function (err, user) {
        if (err)
            res.status(500).send(err);
        else
            res.json(user);
    });

});

router.post('/:id/product', function (req, res, next) {

    Review.getByProduct(req.params.id,function (err, user) {
        if (err)
            res.status(500).send(err);
        else
            res.json(user);
    });

});

router.post('/:id/user', function (req, res, next) {

    Review.getByUser(req.params.id,function (err, user) {
        if (err)
            res.status(500).send(err);
        else
            res.json(user);
    });

});

router.post('/delete', function (req, res, next) {
    Review.remove(req.body.review_id,function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

module.exports = router;
