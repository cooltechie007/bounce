/* irshad to add run script only after 9:15 AM once.
 */
var fileJson = {"timestamp":"1515576010000","exchange":"NSE_FO","symbol":"NIFTY18JANFUT","ltp":"10620.05","close":"10646.9","open":"10643.95","high":"10648","low":"10596.6","vtt":"5993025","atp":"10624.74","oi":"28784775","spot_price":"10616.9","total_buy_qty":"779475","total_sell_qty":"1202850","lower_circuit":"9582.25","upper_circuit":"11711.6","yearly_low":"","yearly_high":"","bids":[{"quantity":"75","price":"10619.8","orders":"1"},{"quantity":"375","price":"10619.55","orders":"1"},{"quantity":"1800","price":"10619.3","orders":"2"},{"quantity":"750","price":"10619.15","orders":"1"},{"quantity":"75","price":"10619.05","orders":"1"}],"asks":[{"quantity":"150","price":"10620.6","orders":"1"},{"quantity":"225","price":"10620.65","orders":"1"},{"quantity":"150","price":"10620.85","orders":"2"},{"quantity":"375","price":"10621.2","orders":"1"},{"quantity":"450","price":"10621.25","orders":"2"}],"ltt":"1515576010000"};
delete fileJson["bids"];
delete fileJson["asks"];
//var deletedContent = delete deletedContent.asks;
console.log(fileJson);
