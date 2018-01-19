#-*- coding:utf-8-*-
#请求方式
import urllib2
import urllib
import random

ua=[
    'Mozilla/5.0(Macintosh;U;IntelMacOSX10_6_8;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50',
    'Mozilla/5.0(Windows;U;WindowsNT6.1;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50',
    'Mozilla/5.0(compatible;MSIE9.0;WindowsNT6.1;Trident/5.0',
    'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11',
]
#随机获取一个user-agent
user_agent=random.choice(ua)
print(user_agent)

#定义传送的数据
keyword = raw_input("请输入你要搜索得关键词：")
get_param={
    "wd":keyword


}
#重新编码
data=urllib.urlencode(get_param)
#定义url地址
url='http://www.baidu.com/s?'
full_url=url +data
print(full_url)

#封装请求对象
request =urllib2.Request(full_url)
request.add_header("User-agent",user_agent)
#发送请求得到相应数据
response=urllib2.urlopen(request)

print(response)
