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
        lotteryId = view_phase.toNumber()-1;
    }
    function view_num_last_round() {
        var view_num_last_round = contract.view_num_last_round.call();
        console.log('上期中獎號碼：', view_num_last_round.toString());
        numbers = view_num_last_round.toString();
    }
    function view_balance() {
        balance = contract.view_balance.call();
        console.log('當期帳戶餘額：', balance.toNumber());
    }
    view_balance();
    view_phase();
    view_num_last_round();
    res.render('lastdraw', {
        draw:"上一期(第"+lotteryId+"期)中獎號碼為："+numbers,
        balance:"目前contract獎金為："+balance.toNumber()
    });
});
module.exports = router;