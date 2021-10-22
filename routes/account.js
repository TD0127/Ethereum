var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');

router.get('/', function (req, res, next) {
    res.render('account', {
        id: req.session.idd,
        address:req.session.address
    });
});
module.exports = router;