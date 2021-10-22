var express = require('express');
var router = express.Router();
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
	var bb;
	function view_balance() {
		var balance = contract.view_balance.call();
		console.log('當期帳戶餘額：', balance.toNumber());
		bb = balance.toNumber()/1000000000000000000;
	}
	view_balance();
	view_phase();
	res.render('guess', {
		id: req.session.idd,
		draw: lotteryId,
		balance: bb
	});
});

router.post('/', function (req, res) {
	var id = req.session.idd;
	var key = req.body.user_private_key;
	var money = req.body.user_money;
	var pool = req.connection;
	var n1 = req.body.user_guess_number1;
	var n2 = req.body.user_guess_number2;
	var n3 = req.body.user_guess_number3;
	var n4 = req.body.user_guess_number4;
	var n5 = req.body.user_guess_number5;
	var n6 = req.body.user_guess_number6;
	pool.getConnection(function (err, connection) {
		connection.query('INSERT INTO user_guess(userId, lotteryId, n1, n2, n3, n4, n5, n6) VALUES(?,?,?,?,?,?,?,?)', [id, lotteryId, n1, n2, n3, n4, n5, n6], function (err, result) {
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
				var contract_address = "0x2F4B222E0b36108A3C678245cAd8858aFE89A29e";
				var contractABI = [{ "constant": false, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "name": "buying", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "name": "drawing", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "findwinner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "findwinner2", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "dest", "type": "address" }, { "name": "winning_prize", "type": "uint256" }], "name": "win_lottery", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "buy", "outputs": [{ "name": "one", "type": "uint256" }, { "name": "two", "type": "uint256" }, { "name": "three", "type": "uint256" }, { "name": "four", "type": "uint256" }, { "name": "five", "type": "uint256" }, { "name": "six", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "lottery", "outputs": [{ "name": "one", "type": "uint256" }, { "name": "two", "type": "uint256" }, { "name": "three", "type": "uint256" }, { "name": "four", "type": "uint256" }, { "name": "five", "type": "uint256" }, { "name": "six", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "phase", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "player_num_temp", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "players_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "user_phase_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "users_address_everyround", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "view_balance", "outputs": [{ "name": "balance1", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "view_num_last_round", "outputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }, { "name": "c", "type": "uint256" }, { "name": "d", "type": "uint256" }, { "name": "e", "type": "uint256" }, { "name": "f", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "view_phase", "outputs": [{ "name": "what_phase", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "name": "winner_address_everyround", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "winner_num_temp", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "winners_count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]
				var contract = web3.eth.contract(contractABI).at(contract_address);
				var balance;
				function view_balance() {
					balance = contract.view_balance.call();
					console.log('當期帳戶餘額：', balance.toNumber());
					balance = balance.toNumber();
					balance+=req.body.user_money*1000000000000000000;
					balance/=1000000000000000000;
				}
				function buying(req, n1, n2, n3, n4, n5, n6, mem_add, mem_key, membuy_val) {

					var get_val = membuy_val * Math.pow(10, 18);
					var wallet_address = mem_add;//test
					// var to_address = "0xCf3892087b9A007930C199EA0cAdc62418161fB5";
					var count = web3.eth.getTransactionCount(wallet_address); //計數器

					var rawTransacton = {
						"from": wallet_address,
						"nonce": web3.toHex(count), //上面都是十六進位
						"gasPrice": web3.toHex(21000000000),
						"gasLimit": web3.toHex(2000000),
						"to": contract_address,
						"value": get_val,
						"data": contract.buying.getData(n1, n2, n3, n4, n5, n6)//轉100枚
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
							view_balance();
							res.render('guess', {
								id: req.session.idd,
								title: 'Your Guess Result：',
								draw: lotteryId,
								draw2: 'Guess Draw：' + lotteryId,
								number1: 'Guess Number1：' + n1,
								number2: 'Guess Number2：' + n2,
								number3: 'Guess Number3：' + n3,
								number4: 'Guess Number4：' + n4,
								number5: 'Guess Number5：' + n5,
								number6: 'Guess Number6：' + n6,
								hash: 'Hash Number：' + hash,
								balance: balance
							});
						}
						else {
							console.log(err);
						}
					});
				}buying(req, n1, n2, n3, n4, n5, n6, req.session.address, key, money);
				console.log(result);
			}
		})
		connection.release();
	})
});
module.exports = router;
