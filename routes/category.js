var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

/**
 * Categories
 */
router.get('/', function (req, res, next) {
    Category.getAll(function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

module.exports = router;
