/* irshad to add run script only after 9:15 AM once.
 */
var consts = require('./const.js');   // including the constants
var accessKey = require('./accessKey.js');
var Upstox = require("upstox");
var upstox = new Upstox(consts.upstox.API_KEY);
var jsonfile = require('fs');
upstox.setToken(accessKey.ACCESS_TOKEN);

/*
 * Creating a variable(set) to keep track of trigerred stocks. `Set` is used to store unique data.
 */
var trigerred_stocks = new Set( consts.stocks_to_exclude );

/*
 * redefining the list stocks to take.
 */
const stocksToTake = consts.settings.STOCKS_TO_TAKE + trigerred_stocks.size;
var first =true;
/*
 * Opening a socket to get the tick data.
 * Sockets are helpful in getting live data
 */
upstox.connectSocket()
            .then(()=>{
                upstox.on("liveFeed", function(message) {
                	process.stdout.write("\rSymbols Subscribed: " + message.length + " | Last Updated: " + new Date().getTime() + " \r");
                	/*
					 * 'message' contains data for all subscribed symbols
					 * Use a `for` loop to iterate through all symbols
					 */
					 //console.log(message);
					 for (var i = 0; i < message.length; i++) {
						 var fileJson = message[i]
						 delete fileJson["bids"];
delete fileJson["asks"];
console.log(fileJson);
jsonfile.appendFile('myjsonfile.json', JSON.stringify(fileJson)+'\n', function (err) {
   if (err) throw err;
 if(first){first=false;
                               var orderObj = {
                                               "transaction_type":"b",     // `b` stands for BUY
                                               "exchange":"NSE_FO",
                                               "symbol": "NIFTY18JAN10400CE",
                                               "quantity": 75,
                                               "order_type":"l",           // `l` stands for LIMIT
                                               "price":100,
                                               "product": "I"              // `I` stands for INTRADAY
                                             };
                                             /*Placing the order using the order object
                             */
                            upstox.placeOrder(orderObj)
                                            .then(function (response) {
                                              console.log(response);
                                            })
                                            .catch(function(error){
                                              console.log(error);
										  });
}

});
}
                });
                upstox.on("disconnected", function(message) {
                    console.log("disconnected", message);
                });
                upstox.on("error", function(error) {
                    console.log("error", message);
                });
            });


function roundDown(number, decimals){
	decimals = decimals || 0;
	return ( Math.floor( number * Math.pow( 10, decimals )) / Math.pow( 10, decimals ) );
}
