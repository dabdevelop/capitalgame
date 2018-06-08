"use strict";

var Player = function (obj) {
    this.parse(obj);
};


Player.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            this.playerId = data.playerId;
            this.account = data.account;
            this.tokenBalance = data.tokenBalance;
            this.buyAmount = data.buyAmount;
            this.sellAmount = data.sellAmount;
            this.burnAmount = data.burnAmount;
            this.buyValue = data.buyValue;
            this.sellValue = data.sellValue;
            this.burnValue = data.burnValue;
            this.firstSeen = data.firstSeen;
            this.avatar = data.avatar;
        } else {
            this.playerId = 0;
            this.account = '';
            this.tokenBalance = 0;
            this.buyAmount = 0;
            this.sellAmount = 0;
            this.burnAmount = 0;
            this.buyValue = 0;
            this.sellValue = 0;
            this.burnValue = 0;
            this.firstSeen = 0;
            this.avatar = '';
        }
    }
};


var Order = function (obj) {
    this.parse(obj);
};

Order.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            this.orderId = data.orderId;
            this.playerId = data.playerId;
            this.account = data.account;
            this.amount = data.amount;
            this.value = data.value;
            this.price = data.price;
            this.crr = data.crr;
            this.timeSeconds = data.timeSeconds;
            this.type = data.type;
        } else {
            this.orderId = 0;
            this.playerId = 0;
            this.account = '';
            this.amount = 0;
            this.value = 0;
            this.price = 0;
            this.crr = 0;
            this.timeSeconds = 0;
            this.type = 0;
        }
    }
};

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
    LocalContractStorage.defineProperties(this, {
        _name: null,
        _symbol: null,
        _decimals: null,
        _totalSupply: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _A: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _B: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _L: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _D: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _INITIAL_PRICE: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _balance: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _insureBalance: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _buyOrderIndex: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _sellOrderIndex: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _burnOrderIndex: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _maxOrderItems: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _playerNum: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        }
    });

    LocalContractStorage.defineMapProperties(this, {
        "balances": {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        "allowed": {
            parse: function (value) {
                return new Allowed(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        buyOrder: {
            parse: function (value) {
                return [].concat(JSON.parse(value));
            },
            stringify: function (o) {
                return JSON.stringify(o);
            }
        },
        sellOrder: {
            parse: function (value) {
                return [].concat(JSON.parse(value));
            },
            stringify: function (o) {
                return JSON.stringify(o);
            }
        },
        burnOrder: {
            parse: function (value) {
                return [].concat(JSON.parse(value));
            },
            stringify: function (o) {
                return JSON.stringify(o);
            }
        },
        Player: {
            parse: function (value) {
                return new Player(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        }
    });
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

        this._buyOrderIndex = new BigNumber(0);
        this._sellOrderIndex = new BigNumber(0);
        this._burnOrderIndex = new BigNumber(0);
        this._maxOrderItems = new BigNumber(250);

        this._playerNum = new BigNumber(0);
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

    accept:function(){
        this.buy();
    },

    buy: function () {
        var from = Blockchain.transaction.from;
        var contractAddress = Blockchain.transaction.to;
        var value = Blockchain.transaction.value;
        if(value.gt(new BigNumber(10).pow(19)) || value.lt(new BigNumber(10).pow(15))){
            throw new Error("Too much or less amount to buy at a time.");
        }
        var exchangeUnit = new BigNumber(10).pow(16);
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
            if(circulation.gt(new BigNumber(10).pow(22)) && contractBalance.gt(new BigNumber(0))){
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
                issueTokenAmount = issueTokenAmount.plus(tokenPerIssue);
                depositedValue = depositedValue.plus(toIssue);
                insuredValue = insuredValue.plus(exchangeUnit.minus(toIssue));
                remainValue = remainValue.minus(exchangeUnit);
                issuedValue = issuedValue.plus(exchangeUnit);
                balance = balance.plus(toIssue);
            }

        }

        var refundValue = value.minus(depositedValue).minus(insuredValue);

        if(refundValue.lt(new BigNumber(0)) || refundValue.gt(value)){
            throw new Error('Invalid refund amount.');
        }

        if(!exchangedValue.plus(issuedValue).equals(depositedValue.plus(insuredValue))){
            throw new Error('Exchanged value not equal.');
        }

        if(!refundValue.equals(remainValue)){
            throw new Error('Refund value not equal.');
        }

        if(!value.minus(remainValue).equals(depositedValue.plus(insuredValue))){
            throw new Error('Value not equal.');
        }

        refundValue = refundValue.floor();

        if(refundValue.gt(new BigNumber(0))){
            var result = Blockchain.transfer(from, refundValue);
            if(!result){
                throw new Error('Refund error.');
            }
            this.refundEvent(true, contractAddress, from, refundValue);
        }

        depositedValue = depositedValue.floor();
        insuredValue = insuredValue.floor();
        issueTokenAmount = issueTokenAmount.floor();
        transferTokenAmount = transferTokenAmount.floor();
        contractBalance = contractBalance.floor();

        this._balance = this._balance.plus(depositedValue);
        this._insureBalance = this._insureBalance.plus(insuredValue);
        this._totalSupply = this._totalSupply.plus(issueTokenAmount);

        this.balances.set(contractAddress, contractBalance);
        var toBalance = this.balances.get(from) || new BigNumber(0);
        this.balances.set(from, toBalance.add(transferTokenAmount).add(issueTokenAmount));

        if(issueTokenAmount.gt(new BigNumber(0))){
            this.issueEvent(true, '0x0', from, issueTokenAmount);
        }

        if(transferTokenAmount.gt(new BigNumber(0))){
            this.transferEvent(true, contractAddress, from, transferTokenAmount);
        }

        this.buyEvent(true, contractAddress, from, issueTokenAmount.plus(transferTokenAmount), depositedValue.plus(insuredValue));

        var buyOrder = new Order();
        var _buyOrder = this.buyOrder.get(this._buyOrderIndex) || [];
        buyOrder.orderId = parseInt(this._buyOrderIndex.mul(this._maxOrderItems).plus(_buyOrder.length).toString(10));
        buyOrder.account = from;
        var now = Date.now();
        buyOrder.timeSeconds = parseInt(now / 1000);
        buyOrder.amount = parseFloat(issueTokenAmount.plus(transferTokenAmount).div(new BigNumber(10).pow(18)).toString(10));
        buyOrder.value = parseFloat(depositedValue.plus(insuredValue).div(new BigNumber(10).pow(18)).toString(10));
        buyOrder.price =  buyOrder.value / buyOrder.amount;
        buyOrder.crr = parseFloat(crr.toString(10)).toFixed(4);
        buyOrder.type = 0;

        var player = this.Player.get(from);
        if(!(player instanceof Player)){
            player = new Player();
            player.playerId = parseInt(this._playerNum.toString(10));
            player.firstSeen = parseInt(now / 1000);
            player.account = from;
            this._playerNum = this._playerNum.plus(1);
        }
        var playerBalance = this.balances.get(from) || new BigNumber(0);
        player.tokenBalance = parseFloat(playerBalance.div(new BigNumber(10).pow(18)).toString(10));
        player.buyAmount = player.buyAmount + buyOrder.amount;
        player.buyValue = player.buyValue + buyOrder.value;
        this.Player.put(from, player);

        buyOrder.playerId = player.playerId;
        _buyOrder.push(buyOrder);
        this.buyOrder.put(this._buyOrderIndex, _buyOrder);
        if(_buyOrder.length >= this._maxOrderItems){
            this._buyOrderIndex = this._buyOrderIndex.plus(1);
        }

        return buyOrder;
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

        var exchangeUnit = new BigNumber(10).pow(18);
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

        transferValue = transferValue.floor();
        contractBalance = contractBalance.floor();
        remainAmount = remainAmount.floor();

        this._balance = this._balance.minus(transferValue);
        this.balances.set(contractAddress, contractBalance);
        var toTokenBalance = this.balances.get(from) || new BigNumber(0);
        this.balances.set(from, toTokenBalance.minus(amount.minus(remainAmount)));


        var result = Blockchain.transfer(from, transferValue);
        if(!result){
            throw new Error('Transfer error.');
        }

        if(transferValue.gt(new BigNumber(0))){
            this.transferEvent(true, from, contractAddress, amount.minus(remainAmount));
        }

        this.sellEvent(true, from, contractAddress, amount.minus(remainAmount), transferValue);

        var sellOrder = new Order();
        var _sellOrder = this.sellOrder.get(this._sellOrderIndex) || [];
        sellOrder.orderId = parseInt(this._sellOrderIndex.mul(this._maxOrderItems).plus(_sellOrder.length).toString(10));
        sellOrder.account = from;
        var now = Date.now();
        sellOrder.timeSeconds = parseInt(now / 1000);
        sellOrder.amount = parseFloat(amount.minus(remainAmount).div(new BigNumber(10).pow(18)).toString(10));
        sellOrder.value = parseFloat(transferValue.div(new BigNumber(10).pow(18)).toString(10));
        sellOrder.price =  sellOrder.value / sellOrder.amount;
        sellOrder.crr = parseFloat(crr.toString(10)).toFixed(4);
        sellOrder.type = 1;

        var player = this.Player.get(from);
        if(!(player instanceof Player)){
            player = new Player();
            player.playerId = parseInt(this._playerNum.toString(10));
            player.firstSeen = parseInt(now / 1000);
            player.account = from;
            this._playerNum = this._playerNum.plus(1);
        }

        var playerBalance = this.balances.get(from) || new BigNumber(0);
        player.tokenBalance = parseFloat(playerBalance.div(new BigNumber(10).pow(18)).toString(10));
        player.sellAmount = player.sellAmount + sellOrder.amount;
        player.sellValue = player.sellValue + sellOrder.value;
        this.Player.put(from, player);

        sellOrder.playerId = player.playerId;
        _sellOrder.push(sellOrder);
        this.sellOrder.put(this._sellOrderIndex, _sellOrder);

        if(_sellOrder.length >= this._maxOrderItems){
            this._sellOrderIndex = this._sellOrderIndex.plus(1);
        }

        return sellOrder;
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

        transferValue = transferValue.floor();

        if(transferValue.gt(new BigNumber(10).pow(20))){
            throw new Error("The transfer value is invalid.");
        }

        if(this._insureBalance.lt(transferValue)){
            throw new Error("Insufficient insure balance.");
        }

        this._insureBalance = this._insureBalance.minus(transferValue);
        this._totalSupply = this._totalSupply.minus(amount);
        this.balances.set(from, tokenBalance.minus(amount));

        var result = Blockchain.transfer(from, transferValue);
        if(!result){
            throw new Error('Transfer error.');
        }

        if(transferValue.gt(new BigNumber(0))){
            this.transferEvent(true, from, '0x0', amount);
        }

        this.burnEvent(true, from, '0x0', amount, transferValue);

        var burnOrder = new Order();
        var _burnOrder = this.burnOrder.get(this._burnOrderIndex) || [];
        burnOrder.orderId = parseInt(this._burnOrderIndex.mul(this._maxOrderItems).plus(_burnOrder.length).toString(10));
        burnOrder.account = from;
        var now = Date.now();
        burnOrder.timeSeconds = parseInt(now / 1000);
        burnOrder.amount = parseFloat(amount.div(new BigNumber(10).pow(18)).toString(10));
        burnOrder.value = parseFloat(transferValue.div(new BigNumber(10).pow(18)).toString(10));
        burnOrder.price = burnOrder.value / burnOrder.amount;
        burnOrder.type = 2;

        var player = this.Player.get(from);
        if(!(player instanceof Player)){
            player = new Player();
            player.playerId = parseInt(this._playerNum.toString(10));
            player.firstSeen = parseInt(now / 1000);
            player.account = from;
            this._playerNum = this._playerNum.plus(1);
        }

        var playerBalance = this.balances.get(from) || new BigNumber(0);
        player.tokenBalance = parseFloat(playerBalance.div(new BigNumber(10).pow(18)).toString(10));
        player.burnAmount = player.burnAmount + burnOrder.amount;
        player.burnValue = player.burnValue + burnOrder.value;
        this.Player.put(from, player);

        burnOrder.playerId = player.playerId;
        _burnOrder.push(burnOrder);
        this.burnOrder.put(this._burnOrderIndex, _burnOrder);

        if(_burnOrder.length >= this._maxOrderItems){
            this._burnOrderIndex = this._burnOrderIndex.plus(1);
        }

        return burnOrder;
    },


    sellPrice: function(_amount){
        var amount = new BigNumber(_amount).mul(new BigNumber(10).pow(18));
        if(amount.gt(new BigNumber(10).pow(21)) || amount.lt(new BigNumber(10).pow(16))){
            throw new Error("Too much or less amount to sell at a time.");
        }

        var from = Blockchain.transaction.from;
        var contractAddress = Blockchain.transaction.to;

        var exchangeUnit = new BigNumber(10).pow(18);
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
            tokenPrice = balance.div(circulation.mul(crr)).mul(new BigNumber(10).pow(18));
            valuePerExchange = exchangeUnit.mul(tokenPrice).div(new BigNumber(10).pow(18));
            transferValue = transferValue.plus(valuePerExchange);
            circulation = circulation.minus(exchangeUnit);
            remainAmount = remainAmount.minus(exchangeUnit);
            contractBalance = contractBalance.plus(exchangeUnit);
        }

        transferValue = transferValue.floor();
        remainAmount = remainAmount.floor();

        var sellOrder = new Order();
        var _sellOrder = this.sellOrder.get(this._sellOrderIndex) || [];
        sellOrder.orderId = parseInt(this._sellOrderIndex.mul(this._maxOrderItems).plus(_sellOrder.length).toString(10));
        sellOrder.account = from;
        var now = Date.now();
        sellOrder.timeSeconds = parseInt(now / 1000);
        sellOrder.amount = parseFloat(amount.minus(remainAmount).div(new BigNumber(10).pow(18)).toString(10));
        sellOrder.value = parseFloat(transferValue.div(new BigNumber(10).pow(18)).toString(10));
        sellOrder.price =  sellOrder.value / sellOrder.amount;
        sellOrder.crr = parseFloat(crr.toString(10)).toFixed(4);
        sellOrder.type = 1;

        var player = this.Player.get(from);
        if(!(player instanceof Player)){
            player = new Player();
            player.playerId = parseInt(this._playerNum.toString(10));
        }

        sellOrder.playerId = player.playerId;

        return sellOrder;
    },

    burnPrice: function(_amount){
        var amount = new BigNumber(_amount).mul(new BigNumber(10).pow(18));
        if(amount.gt(new BigNumber(10).pow(21)) || amount.lt(new BigNumber(10).pow(16))){
            throw new Error("Too much or less amount to burn at a time.");
        }

        var from = Blockchain.transaction.from;
        var contractAddress = Blockchain.transaction.to;
        var insureBalance = this._insureBalance;
        var totalSupply = this._totalSupply;
        var contractBalance = this.balances.get(contractAddress) || new BigNumber(0);
        var circulation = totalSupply.minus(contractBalance);
        var tokenPrice = insureBalance.div(circulation).mul(new BigNumber(10).pow(18));

        var transferValue = tokenPrice.mul(amount).div(new BigNumber(10).pow(18));

        transferValue = transferValue.floor();

        var burnOrder = new Order();
        var _burnOrder = this.burnOrder.get(this._burnOrderIndex) || [];
        burnOrder.orderId = parseInt(this._burnOrderIndex.mul(this._maxOrderItems).plus(_burnOrder.length).toString(10));
        burnOrder.account = from;
        var now = Date.now();
        burnOrder.timeSeconds = parseInt(now / 1000);
        burnOrder.amount = parseFloat(amount.div(new BigNumber(10).pow(18)).toString(10));
        burnOrder.value = parseFloat(transferValue.div(new BigNumber(10).pow(18)).toString(10));
        burnOrder.price = burnOrder.value / burnOrder.amount;
        burnOrder.type = 2;

        var player = this.Player.get(from);
        if(!(player instanceof Player)){
            player = new Player();
            player.playerId = parseInt(this._playerNum.toString(10));
        }

        burnOrder.playerId = player.playerId;

        return burnOrder;
    },

    login: function(){
        var from = Blockchain.transaction.from;
        var player = this.Player.get(from);
        if(!(player instanceof Player)){
            var now = Date.now();
            player = new Player();
            player.playerId = parseInt(this._playerNum.toString(10));
            player.firstSeen = parseInt(now / 1000);
            player.account = from;
            this._playerNum = this._playerNum.plus(1);
            this.Player.put(from, player);
        }
    },

    setAvatar: function(_url){
        var url = _url.trim();
        var from = Blockchain.transaction.from;
        var player = this.Player.get(from);
        if(!(player instanceof Player)){
            var now = Date.now();
            player = new Player();
            player.playerId = parseInt(this._playerNum.toString(10));
            player.firstSeen = parseInt(now / 1000);
            player.account = from;
            this._playerNum = this._playerNum.plus(1);
        }
        player.avatar = url;
        this.Player.put(from, player);
    },

    player: function(_address){
        return this.Player.get(_address) || new Player();
    },

    playerNum: function(){
        return parseInt(this._playerNum.toString(10));
    },

    buyOrderIndex: function(){
        return this._buyOrderIndex.toString(10);
    },

    sellOrderIndex: function(){
        return this._sellOrderIndex.toString(10);
    },

    burnOrderIndex: function(){
        return this._burnOrderIndex.toString(10);
    },

    getBuyOrder: function(_index){
        return this.buyOrder.get(new BigNumber(_index)) || [];
    },

    getSellOrder: function(_index){
        return this.sellOrder.get(new BigNumber(_index)) || [];
    },

    getBurnOrder: function(_index){
        return this.burnOrder.get(new BigNumber(_index)) || [];
    },

    balance: function(){
        return this._balance.toString(10);
    },

    insureBalance: function(){
        return this._insureBalance.toString(10);
    },

    circulation: function(){
        var contractAddress = Blockchain.transaction.to;
        var balance = this.balances.get(contractAddress) || new BigNumber(0);
        return this._totalSupply.minus(balance).toString(10);
    },

    tokenBalance: function(){
        var contractAddress = Blockchain.transaction.to;
        return (this.balances.get(contractAddress) || new BigNumber(0)).toString(10);
    },

    // Returns the name of the token
    name: function () {
        return this._name;
    },

    // Returns the symbol of the token
    symbol: function () {
        return this._symbol;
    },

    // Returns the number of decimals the token uses
    decimals: function () {
        return this._decimals;
    },

    totalSupply: function () {
        return this._totalSupply.toString(10);
    },

    balanceOf: function (owner) {
        var balance = this.balances.get(owner);

        if (balance instanceof BigNumber) {
            return balance.toString(10);
        } else {
            return "0";
        }
    },

    transfer: function (to, value) {
        value = new BigNumber(value);
        if (value.lt(0)) {
            throw new Error("invalid value.");
        }

        var from = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        if (balance.lt(value)) {
            throw new Error("transfer failed.");
        }

        this.balances.set(from, balance.sub(value));
        var toBalance = this.balances.get(to) || new BigNumber(0);
        this.balances.set(to, toBalance.add(value));

        var now = Date.now();
        var playerFrom = this.Player.get(from);
        if(!(playerFrom instanceof Player)){
            playerFrom = new Player();
            playerFrom.playerId = parseInt(this._playerNum.toString(10));
            playerFrom.firstSeen = parseInt(now / 1000);
            playerFrom.account = from;
            this._playerNum = this._playerNum.plus(1);
        }

        var playerFromBalance = this.balances.get(from) || new BigNumber(0);
        playerFrom.tokenBalance = parseFloat(playerFromBalance.div(new BigNumber(10).pow(18)).toString(10));
        this.Player.put(from, playerFrom);

        var playerTo = this.Player.get(to);
        if(!(playerTo instanceof Player)){
            playerTo = new Player();
            playerTo.playerId = parseInt(this._playerNum.toString(10));
            playerTo.firstSeen = parseInt(now / 1000);
            playerTo.account = to;
            this._playerNum = this._playerNum.plus(1);
        }

        var playerToBalance = this.balances.get(to) || new BigNumber(0);
        playerTo.tokenBalance = parseFloat(playerToBalance.div(new BigNumber(10).pow(18)).toString(10));
        this.Player.put(to, playerTo);

        this.transferEvent(true, from, to, value);
    },

    transferFrom: function (from, to, value) {
        var spender = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        var allowed = this.allowed.get(from) || new Allowed();
        var allowedValue = allowed.get(spender) || new BigNumber(0);
        value = new BigNumber(value);

        if (value.gte(0) && balance.gte(value) && allowedValue.gte(value)) {

            this.balances.set(from, balance.sub(value));

            // update allowed value
            allowed.set(spender, allowedValue.sub(value));
            this.allowed.set(from, allowed);

            var toBalance = this.balances.get(to) || new BigNumber(0);
            this.balances.set(to, toBalance.add(value));


            var playerFrom = this.Player.get(from);
            if(!(playerFrom instanceof Player)){
                playerFrom = new Player();
                playerFrom.playerId = parseInt(this._playerNum.toString(10));
                playerFrom.firstSeen = parseInt(now / 1000);
                playerFrom.account = from;
                this._playerNum = this._playerNum.plus(1);
            }

            var now = Date.now();
            var playerFromBalance = this.balances.get(from) || new BigNumber(0);
            playerFrom.tokenBalance = parseFloat(playerFromBalance.div(new BigNumber(10).pow(18)).toString(10));
            this.Player.put(from, playerFrom);

            var playerTo = this.Player.get(to);
            if(!(playerTo instanceof Player)){
                playerTo = new Player();
                playerTo.playerId = parseInt(this._playerNum.toString(10));
                playerTo.firstSeen = parseInt(now / 1000);
                playerTo.account = to;
                this._playerNum = this._playerNum.plus(1);
            }

            var playerToBalance = this.balances.get(to) || new BigNumber(0);
            playerTo.tokenBalance = parseFloat(playerToBalance.div(new BigNumber(10).pow(18)).toString(10));
            this.Player.put(to, playerTo);

            this.transferEvent(true, from, to, value);
        } else {
            throw new Error("transfer failed.");
        }
    },

    issueEvent: function (status, from, to, amount, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Issue: {
                from: from,
                to: to,
                amount: amount,
                value: value
            }
        });
    },

    burnEvent: function (status, from, to, amount, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Burn: {
                from: from,
                to: to,
                amount: amount,
                value: value
            }
        });
    },

    buyEvent: function (status, from, to, amount, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Buy: {
                from: from,
                to: to,
                amount: amount,
                value: value
            }
        });
    },

    sellEvent: function (status, from, to, amount, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Sell: {
                from: from,
                to: to,
                amount: amount,
                value: value
            }
        });
    },

    refundEvent: function (status, from, to, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Refund: {
                from: from,
                to: to,
                value: value
            }
        });
    },

    transferEvent: function (status, from, to, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Transfer: {
                from: from,
                to: to,
                value: value
            }
        });
    },

    approve: function (spender, currentValue, value) {
        var from = Blockchain.transaction.from;

        var oldValue = this.allowance(from, spender);
        if (oldValue != currentValue.toString()) {
            throw new Error("current approve value mistake.");
        }

        var balance = new BigNumber(this.balanceOf(from));
        var value = new BigNumber(value);

        if (value.lt(0) || balance.lt(value)) {
            throw new Error("invalid value.");
        }

        var owned = this.allowed.get(from) || new Allowed();
        owned.set(spender, value);

        this.allowed.set(from, owned);

        this.approveEvent(true, from, spender, value);
    },

    approveEvent: function (status, from, spender, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Approve: {
                owner: from,
                spender: spender,
                value: value
            }
        });
    },

    allowance: function (owner, spender) {
        var owned = this.allowed.get(owner);

        if (owned instanceof Allowed) {
            var spender = owned.get(spender);
            if (typeof spender != "undefined") {
                return spender.toString(10);
            }
        }
        return "0";
    }
};

module.exports = CapitalGame;