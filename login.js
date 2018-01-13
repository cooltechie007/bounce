var consts = require('./const.js');
var Upstox = require("upstox");
var upstox = new Upstox(consts.upstox.API_KEY);
const opn = require('opn');

var loginUrl = upstox.getLoginUri(consts.upstox.REDIRECT_URI, "code");
opn(loginUrl);

console.log('In case the browser window does not open. Please open following url in the browser.:');
console.log(loginUrl);