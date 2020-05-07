var express = require('express');
var router = express.Router();
var multer  = require('multer');
var crypto  = require('crypto');
var path = require('path');
var Product = require('../models/Product');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);

            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});
var upload =  multer({ storage: storage });

router.get('/', function (req, res, next) {
    Product.getAll(function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/add', upload.array('images', 3), function (req, res, next) {
    let body = req.body;
    let files = [];
    req.files.map(file => {
       files.push(file.path.replace('public/',''))
    });

    body.images = files.join(',');
    let product = new Product(body);

    Product.create(product, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/delete', function (req, res, next) {

    Product.remove(req.body.product_id,function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

module.exports = router;
