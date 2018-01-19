#coding:utf-8
import urllib2
#代理开关
proxyswitch=True
#构建一个Handler处理器对象，参数是一个字典类型，包括代理类型和代理服务器
httpproxy_handler=urllib2.ProxyHandler({"http":"125.88.177.128:3128"})

#构建一个没有代理的处理器对象
nullproxy_handler =urllib2.ProxyHandler({})

if proxyswitch:
    opener=urllib2.build_opener(httpproxy_handler)
else:
    opener =urllib2.build_opener(nullproxy_handler)

#构建全局opener，之后所有的请求都可以用urlopen()方式发送，
urllib2.install_opener(opener)
request=urllib2.Request("http://www.baidu.com/")
response =urllib2.urlopen(request)
print response.read()