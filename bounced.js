/* irshad to add run script only after 9:15 AM once.
 */
var consts = require('./const.js');   // including the constants
var Upstox = require("upstox");
var upstox = new Upstox(consts.upstox.API_KEY);

upstox.setToken(consts.upstox.ACCESS_TOKEN);

/*
 * Creating a variable(set) to keep track of trigerred stocks. `Set` is used to store unique data.
 */
var trigerred_stocks = new Set( consts.stocks_to_exclude );

/*
 * redefining the list stocks to take.
 */
const stocksToTake = consts.settings.STOCKS_TO_TAKE + trigerred_stocks.size;
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
					 console.log(message);
                     for (var i = 0; i < message.length; i++) {

                    	/*
                    	 * Check if subscribed for 'full' feed. Bids are not present
                    	 * if subscribed for 'LTP'
                    	 */
                    	if (message[i].asks[1] == undefined) {
                    		console.log('Ask undefined!');
                    		continue;
                    	}

                    	/*
                    	 * Check if there are any buy orders
                    	 * NOTE: Buy orders are not present before market open
                    	 */
                    	if (!message[i].asks[1].price) {
                    		console.log('Market is still closed!');
                    		continue;
                    	}

                    	/*
                    	 * Get and Set the desired variables
                    	 */
                        var timestamp = message[i].timestamp;
                        var symbol = message[i].symbol;
                        var ltp = message[i].ltp;
                        var bounce_price = roundDown( message[i].open * 0.95, 1);

                        /*
                         * Checking if 'bounce price' has been hit,
                         * i.e., if stock has fallen 5% from its 'Open'
                         * And the stock has not been trigerred earlier today
                         */
                        if ( ltp <= bounce_price && !trigerred_stocks.has(symbol) && trigerred_stocks.size<stocksToTake) {
                            console.log(message[i]);

                            /*
                             * Adding the stocks in 'trigerred stocks' list
                             */
                            trigerred_stocks.add(symbol);

                            /*
                             * Calculate quantity based on Capital allocated per trade
                             */
                        	var quantity = roundDown( consts.settings.CAPITAL_PER_STOCK / bounce_price );


                            /*
                             * Print the information about trigerred stocks on the the terminal
                             */
                            console.log('BOUNCED: '+symbol+' | PRICE: '+ltp+' | ENTRY: '+bounce_price);

                            /*
                             * Building the order object for the order to place.
                             * LIMIT BUY INTRADAY ORDER ON NSE EQUITIES
                             */
                            var orderObj = {
                                            "transaction_type":"b",     // `b` stands for BUY
                                            "exchange":"NSE_EQ",
                                            "symbol": symbol,
                                            "quantity": quantity,
                                            "order_type":"l",           // `l` stands for LIMIT
                                            "price":bounce_price,
                                            "product": "I"              // `I` stands for INTRADAY
                                          };

                            /*
                             * Placing the order using the order object
                             */
                            upstox.placeOrder(orderObj)
                                            .then(function (response) {
                                              console.log(response);
                                            })
                                            .catch(function(error){
                                              console.log(error);
                                            });
                        }

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
