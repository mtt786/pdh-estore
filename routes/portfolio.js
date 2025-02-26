var express = require('express');
const process = require('process');
var router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3')
var crypto = require('crypto');
var aws = require('aws-sdk')
var path = require('path');
var Portfolio = require('../models/Portfolio');
aws.config.loadFromPath(process.cwd() + '/config/aws.json');
var s3 = new aws.S3({endpoint: 'https://s3.us-east-2.stackpathstorage.com'})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return callback(err);

            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'akcybex',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, callback) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) return callback(err);

                callback(null, raw.toString('hex') + path.extname(file.originalname));
            });
        }
    })
});

router.get('/', function (req, res, next) {
    if (req.query.category_id) {
        Portfolio.getAllByUserId(req.query.user_id, function (err, user) {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
    } else {
        if(req.query.user_id) {
            Portfolio.getAllByUserId(req.query.user_id, function (err, user) {
                if (err)
                    res.send(err);
                else
                    res.json(user);
            });
        } else {
            Portfolio.getAll(function (err, user) {
                if (err)
                    res.send(err);
                else
                    res.json(user);
            });
        }

    }

});

router.post('/add', upload.array('images', 3), function (req, res, next) {
    let body = req.body;
    let files = [];

    req.files.map(file => {
        files.push('https://cdn.akcybex.com/' + file.key)
    });

    body.images = files.join(',');
    let portfolio = new Portfolio(body);

    Portfolio.create(portfolio, function (err, user) {
        if (err)
            res.status(500).send(err);
        else
            res.json(user);
    });

});

router.post('/:id/update', upload.array('images', 3), function (req, res, next) {
    let body = req.body;
    let files = req.body.old_images.split(',');

    req.files.map(file => {
        files.push('https://cdn.akcybex.com/' + file.key)
    });


    body.images = files.join(',');
    let portfolio = new Portfolio(body);

    Portfolio.updateById(req.params.id, portfolio, function (err, user) {
        if (err)
            res.status(500).send(err);
        else
            res.json(user);
    });

});

router.get('/:id', function (req, res, next) {
    Portfolio.getById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

router.post('/delete', function (req, res, next) {

    Portfolio.remove(req.body.portfolio_id, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });

});

module.exports = router;
