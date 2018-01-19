#-*- coding:utf-8-*-
import requests

response=requests.get('https://www.taobao.com/')
#打印展示数据
print(response.text)