# -*- coding:utf-8 -*-
"""
cooie基本操作
"""
import urllib2
import cookielib

# 创建一个cookie核心对象
cookie = cookielib.CookieJar()

# 创建一个自定义的Handler
cookie_handler = urllib2.HTTPCookieProcessor(cookie)

# 创建一个可以操作cookie的opener对象
cookie_opener = urllib2.build_opener(cookie_handler)

# 发送一个请求
response = cookie_opener.open("https://www.baidu.com")

######重点不在获取到什么数据，而在于cookie中出现了什么数据
for item in cookie:
    print("%s-%s" % (item.name, item.value))
    # "{} - {}".format("hello", "world")