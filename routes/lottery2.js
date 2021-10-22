var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
var numbers;
var lotteryId;
router.get('/', function (req, res, next) {
    var Web3 = require('web3');
    const testnet = 'https://ropsten.infura.io/';
    const web3 = new Web3(new Web3.providers.HttpProvider(testnet)); //串以太坊

    var contract_address = "0x2F4B222E0b36108A3C678245cAd8858aFE89A29e";
    var contractABI = [{ "constant": false, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "name": "buying", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "name": "drawing", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "findwinner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "findwinner2", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "dest", "type": "address" }, { "name": "winning_prize", "type": "uint256" }], "name": "win_lottery", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "buy", "outputs": [{ "name": "one", "type": "uint256" }, { "name": "two", "type": "uint256" }, { "name": "three", "type": "uint256" }, { "name": "four", "type": "uint256" }, { "name": "five", "type": "uint256" }, { "name": "six", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "lottery", "outputs": [{ "name": "one", "type": "uint256" }, { "name": "two", "type": "uint256" }, { "name": "three", "type": "uint256" }, { "name": "four", "type": "uint256" }, { "name": "five", "type": "uint256" }, { "name": "six", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "phase", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "player_num_temp", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "players_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "user_phase_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "users_address_everyround", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "view_balance", "outputs": [{ "name": "balance1", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "view_num_last_round", "outputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "view_phase", "outputs": [{ "name": "what_phase", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "winner_address_everyround", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "winner_num_temp", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "winners_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]
    var contract = web3.eth.contract(contractABI).at(contract_address);

    function view_phase() {
        var view_phase = contract.view_phase.call();
        console.log('目前為第', view_phase.toNumber(), '期');
        lotteryId = view_phase.toNumber();
    }
    view_phase();
    res.render('lottery2', {
        router_method: 'get'
    });
});

router.post('/', function (req, res) {
    var pool = req.connection;
    var resultHash;
    var key = req.body.user_private_key;
    var n1, n2, n3, n4, n5, n6;
    n1 = 1;
    n2 = 2;
    n3 = 3;
    n4 = 4;
    n5 = 5;
    n6 = 6;
    pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO lottery(LotteryId, n1,n2,n3,n4,n5,n6) VALUES(?,?,?,?,?,?,?)', [lotteryId, n1, n2, n3, n4, n5, n6], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                //Transaction
                var Web3 = require('web3');
                const testnet = 'https://ropsten.infura.io/';
                const web3 = new Web3(new Web3.providers.HttpProvider(testnet)); //串以太坊

                var mem_add, mem_key, d1, d2, d3, d4, d5, d6;

                function drawing(d1, d2, d3, d4, d5, d6, mem_add, mem_key) {

                    var contract_address = "0x2F4B222E0b36108A3C678245cAd8858aFE89A29e";
                    var contractABI = [{ "constant": false, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "name": "buying", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "name": "drawing", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "findwinner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "findwinner2", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "dest", "type": "address" }, { "name": "winning_prize", "type": "uint256" }], "name": "win_lottery", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "buy", "outputs": [{ "name": "one", "type": "uint256" }, { "name": "two", "type": "uint256" }, { "name": "three", "type": "uint256" }, { "name": "four", "type": "uint256" }, { "name": "five", "type": "uint256" }, { "name": "six", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "lottery", "outputs": [{ "name": "one", "type": "uint256" }, { "name": "two", "type": "uint256" }, { "name": "three", "type": "uint256" }, { "name": "four", "type": "uint256" }, { "name": "five", "type": "uint256" }, { "name": "six", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "phase", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "player_num_temp", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "players_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "user_phase_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "users_address_everyround", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "winner_address_everyround", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "winner_num_temp", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "winners_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]
                    var contract = web3.eth.contract(contractABI).at(contract_address);

                    var wallet_address = mem_add;
                    // var to_address = "0xCf3892087b9A007930C199EA0cAdc62418161fB5";
                    var count = web3.eth.getTransactionCount(wallet_address); //計數器


                    var rawTransacton = {
                        "from": wallet_address,
                        "nonce": web3.toHex(count), //上面都是十六進位
                        "gasPrice": web3.toHex(21000000000),
                        "gasLimit": web3.toHex(2000000),
                        "to": contract_address,
                        "value": "0x0",
                        "data": contract.drawing.getData(d1, d2, d3, d4, d5, d6)//轉100枚
                    };
                    //function transfer(address _to, uint256 _value) public returns (bool) 
                    var Tx = require("ethereumjs-tx").Transaction;
                    //var Tx = require('ethereumjs-tx'); //簽署合約 以下都是固定寫法
                    var privateKey = new Buffer(mem_key, "hex");
                    var tx = new Tx(rawTransacton, { 'chain': 'ropsten' });

                    tx.sign(privateKey);
                    var serializedTx = tx.serialize();//把它序列化

                    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) { //call back function 上面做完才會往下，等待時就不會進入
                        if (!err) {
                            console.log(hash); //這筆交易的流水號
                            res.render('lottery2', {
                                draw: '第' + lotteryId + '期',
                                number1: '中獎號碼1：' + n1,
                                number2: '中獎號碼2：' + n2,
                                number3: '中獎號碼3：' + n3,
                                number4: '中獎號碼4：' + n4,
                                number5: '中獎號碼5：' + n5,
                                number6: '中獎號碼6：' + n6,
                                hash: 'Hash Number：' + hash
                            });
                        }
                        else {
                            console.log(err);
                        }
                    });
                }
                console.log(rows);
                drawing(n1, n2, n3, n4, n5, n6, "0x12D87A35cde96A477074dfE07288756E9751129a", "768E8A5D3A32C0BEA49CC52557AC72DD83004AD128DFEB9F537B0E16BBEE8280");
            }
        })

        connection.release();
    })
});
module.exports = router;