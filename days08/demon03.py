#coding:utf-8
# import scrapy
from selenium import webdriver
import time
drive= webdriver.PhantomJS()
drive.get('https://qzone.qq.com/')
# drive.maximize_window()
drive.save_screenshot("zone.png")
drive.switch_to_frame("login_frame")

#2.填写表单数据