var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/', function(req, res, next) {
    var id = req.body.user_id;
    var pass = req.body.user_password;
    if(id=="" || pass==""){
        res.render('login');
   }else{
        //global.userID = id;
        req.session.idd = req.body.user_id;
        console.log("SessionId"+req.session.idd);
        //
        var pool = req.connection;
        pool.getConnection(function (err, connection) {
        connection.query('SELECT userAccount FROM user_info WHERE userId = "'+req.body.user_id+'"', function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                //console.log(rows);
                req.session.address = rows[0].userAccount;
                res.redirect('guess');
                console.log("SessionAddress"+req.session.address);
            }
        })
        connection.release();
    })
   }
   

});

module.exports = router;
