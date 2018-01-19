# -*- coding:utf-8 -*-

import urllib2
import cookielib

# 创建cookie核心对象
cookie = cookielib.MozillaCookieJar()
# 从文件加载cookie数据
cookie.load("baidu.txt")

# 创建Handler操作对象
cookie_handler = urllib2.HTTPCookieProcessor(cookie)
# 创建opener对象
cookie_opener = urllib2.build_opener(cookie_handler)

# 访问目标地址
response = cookie_opener.open("http://www.baidu.com")

print(response.read())