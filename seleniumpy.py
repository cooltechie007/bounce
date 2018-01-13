#var webdriver = require('selenium-webdriver')

import time
from upstox_api.api import *
from urllib import parse
#Create a Session object with your api_key, redirect_uri and api_secret
upstok_api_key = "grcvaF6vhK6kPcGOPd8VP1IKQwVqpLfJ1mSshyx7"
upstok_api_secret = "15pfd4fbm7"
redirect_uri='http://127.0.0.1'
f = open('accessKey.js','w')

s = Session (upstok_api_key)
s.set_redirect_uri(redirect_uri)
s.set_api_secret (upstok_api_secret)
url =s.get_login_url()
print (url)
from selenium import webdriver
#driver = webdriver.Chrome("C:/Users/Python/Python36-32/Scripts/chromedriver.exe")
driver = webdriver.Firefox()
driver.get(url)
user = driver.find_element_by_name("username")
password = driver.find_element_by_name("password")
year = driver.find_element_by_name("password2fa")
user.clear()
user.send_keys("135147")
password.clear()
password.send_keys("zerodha@77")
year.clear()
year.send_keys("1982")
year.send_keys(u'\ue007')
print(driver.current_url)
#driver.get(driver.current_url)
time.sleep(3)
input = driver.find_element_by_id("allow")
input.send_keys(u'\ue007')
time.sleep(2)
#get current url
parsed = parse.urlparse(driver.current_url)
s.set_code(parse.parse_qs(parsed.query)['code'][0])
#Retrieve your access token
access_token = s.retrieve_access_token()
f.write('module.exports.ACCESS_TOKEN ="%s'"%access_token)
f.close()
print ('Received access_token: %s' % access_token)
driver.quit();
