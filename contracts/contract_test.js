"use strict";

var BigNumber = require('bignumber.js');

var Allowed = function (obj) {
    this.allowed = {};
    this.parse(obj);
};

Allowed.prototype = {
    toString: function () {
        return JSON.stringify(this.allowed);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            for (var key in data) {
                this.allowed[key] = new BigNumber(data[key]);
            }
        }
    },

    get: function (key) {
        return this.allowed[key];
    },

    set: function (key, value) {
        this.allowed[key] = new BigNumber(value);
    }
};


var CapitalGame = function () {
    this.balances = new Allowed();
    this.allowed = {};
};

CapitalGame.prototype = {
    init: function () {
        this._name = 'CapitalGameToken';
        this._symbol = "CGT";
        this._decimals = 18;
        this._totalSupply = new BigNumber(0);

        this._A = new BigNumber(0.6);
        this._B = new BigNumber(0.2);
        this._L = new BigNumber(200000).mul(new BigNumber(10).pow(18));
        this._D = new BigNumber(50000).mul(new BigNumber(10).pow(18));

        this._INITIAL_PRICE = new BigNumber(10).pow(16);

        this._balance = new BigNumber(0);
        this._insureBalance = new BigNumber(0);
    },

    _sigmoid: function(_A, _B, _L, _D, _X){
        if(_X.lt(new BigNumber(0))){
            throw new Error('Invalid parameter.');
        }
        var E = 2.71828182845904;
        return new BigNumber(1).div(new BigNumber(1).plus(Math.pow(E, parseFloat(_X.minus(_L).div(_D).toString(10))).toFixed(15))).mul(_A).plus(_B);
    },

    _crr: function (_circulation){
        var crr = this._sigmoid(this._A, this._B, this._L, this._D, _circulation);
        if(crr.lt(this._B) || crr.gt(this._A.plus(this._B))){
            throw new Error('Invalid crr.');
        }
        return  crr;
    },

    buy: function () {
        var from = Blockchain.transaction.from;
        var contractAddress = Blockchain.transaction.to;
        var value = Blockchain.transaction.value;
        if(value.gt(new BigNumber(10).pow(19)) || value.lt(new BigNumber(10).pow(16))){
            throw new Error("Too much or less amount to buy at a time.");
        }
        var exchangeUnit = new BigNumber(10).pow(17);
        var times = parseInt(value.div(exchangeUnit).toString(10)) + 1;
        var depositedValue = new BigNumber(0);
        var insuredValue = new BigNumber(0);
        var exchangedValue = new BigNumber(0);
        var issuedValue = new BigNumber(0);
        var remainValue = value;
        var transferTokenAmount = new BigNumber(0);
        var issueTokenAmount = new BigNumber(0);
        var balance = this._balance;
        var totalSupply = this._totalSupply;
        var contractBalance = this.balances.get(contractAddress) || new BigNumber(0);
        var circulation = this._totalSupply.minus(contractBalance);
        var crr;
        var tokenPrice;
        for(var i = 0; i < times; i++){
            if(remainValue.lte(new BigNumber(0))){
                break;
            }
            if(exchangeUnit.gt(remainValue)){
                exchangeUnit = remainValue;
            }
            if(contractBalance.gt(new BigNumber(0))){
                crr = this._crr(circulation);
                tokenPrice = balance.div(circulation.mul(crr)).mul(new BigNumber(10).pow(18));
                var tokenPerExchange = exchangeUnit.div(tokenPrice).mul(new BigNumber(10).pow(18));
                crr = this._crr(circulation.plus(tokenPerExchange));
                tokenPrice = balance.plus(exchangeUnit).div(circulation.mul(crr)).mul(new BigNumber(10).pow(18));
                tokenPerExchange = exchangeUnit.div(tokenPrice).mul(new BigNumber(10).pow(18));
                if(contractBalance.gte(tokenPerExchange)){
                    circulation = circulation.plus(tokenPerExchange);
                    contractBalance = contractBalance.minus(tokenPerExchange);
                    transferTokenAmount = transferTokenAmount.plus(tokenPerExchange);
                    depositedValue = depositedValue.plus(exchangeUnit);
                    remainValue = remainValue.minus(exchangeUnit);
                    exchangedValue = exchangedValue.plus(exchangeUnit);
                    balance = balance.plus(exchangeUnit);
                } else {
                    tokenPerExchange = contractBalance;
                    crr = this._crr(circulation.plus(tokenPerExchange));
                    tokenPrice = balance.plus(exchangeUnit).div(circulation.mul(crr)).mul(new BigNumber(10).pow(18));
                    circulation = circulation.plus(tokenPerExchange);
                    contractBalance = contractBalance.minus(tokenPerExchange);
                    transferTokenAmount = transferTokenAmount.plus(tokenPerExchange);
                    var toDeposit = tokenPrice.mul(tokenPerExchange).div(new BigNumber(10).pow(18));
                    depositedValue = depositedValue.plus(toDeposit);
                    remainValue = remainValue.minus(toDeposit);
                    exchangedValue = exchangedValue.plus(toDeposit);
                    balance = balance.plus(toDeposit);
                }
            } else {
                crr = this._crr(circulation);
                var toIssue = exchangeUnit.mul(crr);

                var tokenPerIssue = toIssue.div(this._INITIAL_PRICE).mul(new BigNumber(10).pow(18));

                circulation = circulation.plus(tokenPerIssue);
                depositedValue = depositedValue.plus(toIssue);
                issueTokenAmount = issueTokenAmount.plus(tokenPerIssue);
                insuredValue = insuredValue.plus(exchangeUnit.minus(toIssue));
                remainValue = remainValue.minus(exchangeUnit);
                issuedValue = issuedValue.plus(exchangeUnit);
                balance = balance.plus(toIssue);
                tokenPrice = exchangeUnit.div(tokenPerIssue).mul(new BigNumber(10).pow(18));
            }

        }

        var refundValue = value.minus(depositedValue).minus(insuredValue);
        if(refundValue.lt(new BigNumber(0)) || refundValue.gt(value)){
            throw new Error('Invalid refund amount.');
        }

        if(!exchangedValue.plus(issuedValue).equals(depositedValue.plus(insuredValue))){
            throw new Error('Value not equal.');
        }

        //var result = Blockchain.transfer(from, refundValue);
        //if(!result){
        //    throw new Error('Refund error.');
        //}

        this._balance = this._balance.plus(depositedValue);
        this._insureBalance = this._insureBalance.plus(insuredValue);
        this._totalSupply = totalSupply.plus(issueTokenAmount);

        this.balances.set(contractAddress, contractBalance);
        var toBalance = this.balances.get(from) || new BigNumber(0);
        this.balances.set(from, toBalance.add(transferTokenAmount).add(issueTokenAmount));

        //if(issueTokenAmount.gt(new BigNumber(0))){
        ////    this.issueEvent(true, contractAddress, from, issueTokenAmount, issuedValue);
        //    console.log(true, contractAddress, from, issueTokenAmount, issuedValue);
        //}
        //if(transferTokenAmount.gt(new BigNumber(0))){
        ////    this.transferEvent(true, contractAddress, from, transferTokenAmount);
        //    console.log(true, contractAddress, from, transferTokenAmount);
        //}
        if(issueTokenAmount.gt(new BigNumber(0)) || transferTokenAmount.gt(new BigNumber(0))){
        //    this.buyEvent(true, contractAddress, from, transferTokenAmount, depositedValue.plus(insuredValue));
            console.log('buy: ', 'crr: ', parseFloat(crr).toFixed(3), 'token:', parseFloat(transferTokenAmount.add(issueTokenAmount).div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'price:', parseFloat(tokenPrice.div(new BigNumber(10).pow(18)).toString(10)).toFixed(6), 'balanceUser:', parseFloat(this.balances.get(from).div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'totalSupply:', parseFloat(this._totalSupply.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'balaceNAS:', parseFloat(this._balance.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'insureBalance:', parseFloat(this._insureBalance.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2));
        }

        return transferTokenAmount.add(issueTokenAmount).div(new BigNumber(10).pow(18)).toString(10);
    },

    sell: function(_amount){
        var amount = new BigNumber(_amount).mul(new BigNumber(10).pow(18));
        if(amount.gt(new BigNumber(10).pow(21)) || amount.lt(new BigNumber(10).pow(16))){
            throw new Error("Too much or less amount to sell at a time.");
        }

        var from = Blockchain.transaction.from;
        var tokenBalance = this.balances.get(from) || new BigNumber(0);

        if (tokenBalance.lt(amount)) {
            throw new Error("Insufficient token amount.");
        }

        var contractAddress = Blockchain.transaction.to;

        var exchangeUnit = new BigNumber(10).pow(19);
        var remainAmount = amount;
        var times = parseInt(amount.div(exchangeUnit).toString(10)) + 1;

        var transferValue = new BigNumber(0);
        var balance = this._balance;
        var totalSupply = this._totalSupply;
        var contractBalance = this.balances.get(contractAddress) || new BigNumber(0);
        var circulation = totalSupply.minus(contractBalance);
        var crr;
        var tokenPrice;
        for(var i = 0; i < times; i ++){
            if(remainAmount.lte(new BigNumber(0))){
                break;
            }
            if(exchangeUnit.gt(remainAmount)){
                exchangeUnit = remainAmount;
            }

            crr = this._crr(circulation);
            tokenPrice = balance.div(circulation.mul(crr)).mul(new BigNumber(10).pow(18));
            var valuePerExchange = exchangeUnit.mul(tokenPrice).div(new BigNumber(10).pow(18));
            crr = this._crr(circulation.minus(exchangeUnit));
            balance = balance.minus(valuePerExchange);
            if(balance.lt(new BigNumber(0))){
                throw new Error("Insufficient balance.");
            }
            tokenPrice = balance.div(circulation.mul(crr)).mul(new BigNumber(10).pow(18));
            valuePerExchange = exchangeUnit.mul(tokenPrice).div(new BigNumber(10).pow(18));
            transferValue = transferValue.plus(valuePerExchange);
            circulation = circulation.minus(exchangeUnit);
            remainAmount = remainAmount.minus(exchangeUnit);
            contractBalance = contractBalance.plus(exchangeUnit);
        }

        if(transferValue.gt(new BigNumber(10).pow(20))){
            throw new Error("The transfer value is invalid.");
        }

        if(remainAmount.lt(new BigNumber(0)) || amount.lt(remainAmount)){
            throw new Error("The remain amount is invalid.");
        }

        if(amount.minus(remainAmount).equals(new BigNumber(0)) && !transferValue.equals(new BigNumber(0))){
            throw new Error("The sell order is invalid.");
        }

        var _contractBalance = this.balances.get(contractAddress) || new BigNumber(0);
        if(!amount.minus(remainAmount).equals(contractBalance.minus(_contractBalance))){
            throw new Error("The exchange amount is not equal.")
        }

        if(this._balance.lt(transferValue)){
            throw new Error("Insufficient balance.");
        }

        this._balance = this._balance.minus(transferValue);
        this.balances.set(contractAddress, contractBalance);
        var toTokenBalance = this.balances.get(from) || new BigNumber(0);
        this.balances.set(from, toTokenBalance.minus(amount.minus(remainAmount)));

        //console.log(parseFloat(transferValue.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2));
        //
        //var result = Blockchain.transfer(from, transferValue);
        //if(!result){
        //    throw new Error('Transfer error.');
        //}

        //if(transferValue.gt(new BigNumber(0))){
        //    this.transferValueEvent(true, contractAddress, from, transferValue);
        //}
        //
        //if(amount.minus(remainAmount).gt(new BigNumber(0))){
        //    this.sellEvent(true, from, contractAddress, amount.minus(remainAmount), transferValue);
        //}

        console.log('sell: ', parseFloat(crr).toFixed(3), 'token:', parseFloat(amount.minus(remainAmount).div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'price:', parseFloat(tokenPrice.div(new BigNumber(10).pow(18)).toString(10)).toFixed(6), 'balanceUser:', parseFloat(this.balances.get(from).div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'value:', parseFloat(transferValue.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'circulation:', parseFloat(this._totalSupply.minus(this.balances.get(contractAddress)).div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'balanceNAS:', parseFloat(this._balance.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2));

        return transferValue.toString(10);


    },

    burn: function(_amount){
        var amount = new BigNumber(_amount).mul(new BigNumber(10).pow(18));
        if(amount.gt(new BigNumber(10).pow(21)) || amount.lt(new BigNumber(10).pow(16))){
            throw new Error("Too much or less amount to burn at a time.");
        }

        var from = Blockchain.transaction.from;
        var tokenBalance = this.balances.get(from) || new BigNumber(0);

        if (tokenBalance.lt(amount)) {
            throw new Error("Insufficient token amount.");
        }

        var contractAddress = Blockchain.transaction.to;
        var insureBalance = this._insureBalance;
        var totalSupply = this._totalSupply;
        var contractBalance = this.balances.get(contractAddress) || new BigNumber(0);
        var circulation = totalSupply.minus(contractBalance);
        var tokenPrice = insureBalance.div(circulation).mul(new BigNumber(10).pow(18));

        var transferValue = tokenPrice.mul(amount).div(new BigNumber(10).pow(18));

        if(transferValue.gt(new BigNumber(10).pow(20))){
            throw new Error("The transfer value is invalid.");
        }

        if(this._insureBalance.lt(transferValue)){
            throw new Error("Insufficient insure balance.");
        }

        this._insureBalance = this._insureBalance.minus(transferValue);
        this._totalSupply = this._totalSupply.minus(amount);
        this.balances.set(from, tokenBalance.minus(amount));

        //console.log(transferValue);

        //
        //var result = Blockchain.transfer(from, transferValue);
        //if(!result){
        //    throw new Error('Transfer error.');
        //}

        //if(amount.gt(new BigNumber(0))){
        //    this.burnEvent(true, from, contractAddress, amount, transferValue);
        //}

        console.log('burn: ', 'token:', parseFloat(amount.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'price:', parseFloat(tokenPrice.div(new BigNumber(10).pow(18)).toString(10)).toFixed(6), 'balanceUser:', parseFloat(this.balances.get(from).div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'value:', parseFloat(transferValue.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'circulation:', parseFloat(this._totalSupply.minus(this.balances.get(contractAddress)).div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'balanceNAS:', parseFloat(this._balance.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2), 'insureBalance:', parseFloat(this._insureBalance.div(new BigNumber(10).pow(18)).toString(10)).toFixed(2));

        return transferValue.toString(10);
    }
};


var Blockchain = {transaction: {}};
Blockchain.transaction.from = 'n1HhV62oW2WNhWMA9gddgiR7Vuopjqh1onp';
Blockchain.transaction.to = 'n1N7RTHqYBysTeqNT85akGxk27QRvPz4ctu';
Blockchain.transaction.value = new BigNumber(10).pow(18);


var cg = new CapitalGame();
cg.init();
for(var i = 0; i<10000; i++){
    cg.buy();
    cg.sell(0.01)
    cg.burn(0.01)
}

//Blockchain.transaction.value = new BigNumber(10).pow(17).mul(2);
//for(var j = 0; j<3; j++){
//    //cg.buy();
//    cg.sell(10);
//    //cg.burn(10);
//}
//
//cg.buy();
//cg.buy();
//cg.buy();