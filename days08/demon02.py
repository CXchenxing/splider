#coding:utf-8
from selenium import webdriver
import time

from selenium.webdriver.common.keys import Keys
drive=webdriver.PhantomJS()

drive.get("https://passport.csdn.net/account/login?ref=toolbar")
drive.save_screenshot("cdsn.png")
time.sleep(3)
#登录表单填写数据
drive.find_element_by_id("username").clear()
drive.find_element_by_id("username").send_keys(u'15093087232')
drive.find_element_by_id("password").clear()
drive.find_element_by_id("password").send_keys(u'5211314.love')
time.sleep(3)
#截图查看数据是否正常
drive.save_screenshot("cdsn2.png")

#3.开始登录
drive.find_element_by_css_selector('#fm1 .logging').click()

drive.save_screenshot("cdsn3.png")