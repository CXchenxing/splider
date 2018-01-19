# -*- coding:utf-8 -*-

import urllib2
import cookielib

# 创建一个cookie核心对象
cookie = cookielib.MozillaCookieJar("baidu.txt")

# 创建一个cookie操作对象
cookie_handler = urllib2.HTTPCookieProcessor(cookie)

# 创建一个opener对象
cookie_opener = urllib2.build_opener(cookie_handler)

# 访问目标url
response = cookie_opener.open("https://www.baidu.com")

# 访问结束后~得到服务器响应——cookie数据就已经存在了，将数据保存到文件中
cookie.save()
