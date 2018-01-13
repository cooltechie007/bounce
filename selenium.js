var webdriver = require('selenium-webdriver')
var Upstox = require("upstox");

var consts = require('./const.js');
var upstox = new Upstox("your apiKey");
var loginUrl = upstox.getLoginUri(your-redirect-uri);

var myURL = 'https://api.upstox.com/index/dialog/authorize?apiKey=grcvaF6vhK6kPcGOPd8VP1IKQwVqpLfJ1mSshyx7&redirect_uri=http://127.0.0.1&response_type=code'
var driver = new webdriver.Builder().forBrowser('firefox').build();
driver.get(myURL);
var By = webdriver.By
var until = webdriver.until
let el = driver.findElement(By.id('password'));
  driver.wait(until.elementLocated(el,1000).then(function (response) {
                console.log(response);
            });


);