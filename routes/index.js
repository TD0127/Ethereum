var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var n = parseInt(Math.random() * (5 - 1) + 1, 10);
    res.render('index', { title: 'Express', n:n});
});

module.exports = router;//模組化
