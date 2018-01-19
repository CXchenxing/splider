#-*- coding:utf-8 -*-
import urllib2
url ="https://www.taobao.com"
request=urllib2.Request(url)

proxy_handler=urllib2.ProxyHandler({"http": "110.73.8.153:8123"})
#代理：免费代理|收费代理
#类型：透明|匿名|高匿

# 构建一个opener对象
proxy_opener=urllib2.build_opener(proxy_handler)

response =proxy_opener.open(request)
print(response.read())