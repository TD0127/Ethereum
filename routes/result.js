var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
var start = 1576831803;//2019/12/20 16:50
var numbers;

router.get('/', function(req, res, next) {
    //scheduleCronstyle(req, res);
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];//原有陣列放全部數字

var result = [];//開另一個空陣列
var ranNum = 6;

for (var i = 0; i < ranNum; i++) {
var ran = Math.floor(Math.random() * arr.length);
result.push(arr.splice(ran, 1)[0]); //舊陣列去除數字轉移到新陣列
};
result.sort();
    console.log('randomNumber1:' + result[0])
    console.log('randomNumber2:' + result[1])
    console.log('randomNumber3:' + result[2])
    console.log('randomNumber4:' + result[3])
    console.log('randomNumber5:' + result[4])
    console.log('randomNumber6:' + result[5])
    res.render('result', {title: 'Result'});
});

router.post('/', function(req, res){
    var id = req.body.user_id;
    var pass = req.body.user_password;
    var account = req.body.user_account;

    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO user_info(userId, userPassword, userAccount) VALUES(?,?,?)', [id,pass,account],function (err, result) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                console.log(result);
                res.render('result', { 
                    router_method: 'post',
                    id: id,
                    pass: pass,
                    account: account
                });

            }
        })
        connection.release();
    })

});
module.exports = router;
function scheduleCronstyle(req, res){
    var lotteryId;
    var pool = req.connection;
    schedule.scheduleJob('0 * * * * *', function(){
        //time
        let ts = Date.now();
        var minus = (Math.floor(ts/1000)-start)/60;
        var lotteryId = minus;
        // timestamp in milliseconds
        console.log(lotteryId);
        // timestamp in seconds
        console.log(Math.floor(ts/1000));   
        //random number
        numbers = Math.floor(Math.random() * (5- 1) + 1);
        console.log('scheduleCronstyle:' + new Date());
        console.log('randomNumber:'+numbers)
        pool.getConnection(function (err, connection) {
            connection.query('INSERT INTO lottery(LotteryId, number) VALUES(?,?)', [lotteryId,numbers])
            connection.release();
        })
    }); 
}