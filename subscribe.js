var consts = require('./const.js');
var Upstox = require("upstox");
var accessKey = require('./accessKey.js');

var upstox = new Upstox(consts.upstox.API_KEY);

upstox.setToken(accessKey.ACCESS_TOKEN);

symbolsFnO = "NIFTY18JANFUT";

var feedSub = {
    "type": "full",
    //"exchange": "nse_index",
    "exchange": "nse_fo",
    "symbol": symbolsFnO
};

upstox.subscribeFeed(feedSub).then(function (response) {
                console.log(response);
            });

/*upstox.setToken(consts.upstox.ACCESS_TOKEN);

symbolsFnO = "NIFTY_50";

 feedSub = {
    "type": "full",
    "exchange": "nse_index",
    "symbol": symbolsFnO
};

upstox.subscribeFeed(feedSub).then(function (response) {
                console.log(response);
            });*/