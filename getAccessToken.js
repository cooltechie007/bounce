var consts = require('./const.js');
var Upstox = require("upstox");
var upstox = new Upstox(consts.upstox.API_KEY);

var params = {
    "apiKey" : consts.upstox.API_KEY,
    "apiSecret" : consts.upstox.API_SECRET,
    "code" : consts.upstox.LOGIN_CODE,
    "grant_type" : "authorization_code",
    "redirect_uri" : consts.upstox.REDIRECT_URI
};

upstox.getAccessToken(params)
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    });