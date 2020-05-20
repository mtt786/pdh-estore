var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
const process = require('process');
var multer = require('multer');
var multerS3 = require('multer-s3');
var crypto = require('crypto');
var aws = require('aws-sdk');
var path = require('path');
var Portfolio = require('../models/Portfolio');
var nodemailer = require("nodemailer");
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.googlemail.com",
    auth: {
        user: "prohubdesigns@gmail.com",
        pass: "Prohub786"
    }
});

aws.config.loadFromPath(process.cwd() + '/config/aws.json');
var s3 = new aws.S3({endpoint: 'https://s3.us-east-2.stackpathstorage.com'});

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

router.post('/user/add', upload.single('image'), function (req, res, next) {
    var _user = new User(req.body);

    if (req.file){
        _user.image = req.file.key;
    }
    console.log(_user)
    _user.is_admin = req.body.is_admin;
    User.create(_user, function (err, user) {
        if (err)
            res.status(500).send(err);
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

router.get('/user/:id', function (req, res, next) {
    User.getById(req.params.id, function (err, user) {
        if (err)
            res.status(500).send(err);
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

router.post('/contact-us', function (req, res, next) {
    var mailOptions={
        to : req.body.to ? req.body.to : "protechtigon@gmail.com",
        subject : `${req.body.name}, ${req.body.phone_number}, ${req.body.email}`,
        text : req.body.message
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});


module.exports = router;
