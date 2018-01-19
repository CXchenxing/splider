#-*- coding:utf-8 -*-
import random
import urllib2

#定义可用的user-agent
ua=[
    'Mozilla/5.0(Macintosh;U;IntelMacOSX10_6_8;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50',
    'Mozilla/5.0(Windows;U;WindowsNT6.1;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50',
    'Mozilla/5.0(compatible;MSIE9.0;WindowsNT6.1;Trident/5.0',
    'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11',
]
#随机获取一个user-agent
user_agent=random.choice(ua)
print(user_agent)

#定义请求头
my_header={
    'User-agent':user_agent,
    "message":"hello,你好",
}
#封装请求对象，设置请求头数据
url="https://www.taobao.com"
request=urllib2.Request(url,headers=my_header)

response=urllib2.urlopen(request)
print (response.read())
