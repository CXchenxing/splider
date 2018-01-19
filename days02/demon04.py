#-*-coding:utf-8-*-
#url 地址 http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule HTTP/1.1
#请求参数
'''
i	你真帅
from	AUTO
to	AUTO
smartresult	dict
client	fanyideskweb
salt	1515503271660
sign	937c7ad09eab03107d6fdf0aca4787b2
doctype	json
version	2.1
keyfrom	fanyi.web
action	FY_BY_CLICKBUTTION
typoResult	false
'''

#引入需要的模块
import urllib2
import urllib
import random
#######################################################################
import time
E = "fanyideskweb"
# salt盐值
r = str(time.time()*1000 + random.randint(1,10))
# 确定翻译的数据
n = raw_input("请输入要翻译的词语：")
# 确定加密的混淆吗
O = "aNPG!!u6sesA>hBAW1@(-"
# 确定sign参数
import hashlib
sign = hashlib.md5(E + n + r + O).hexdigest()

# 设置有道在线翻译的请求头
headers = {
    #"Host": "fanyi.youdao.com",
    #"Connection": "keep-alive",
    #"Content-Length": "200",
    #"Accept": "application/json, text/javascript, */*; q=0.01",
    #"Origin": "http://fanyi.youdao.com",
    #"X-Requested-With": "XMLHttpRequest",
    #"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Referer": "http://fanyi.youdao.com/",
    # "Accept-Encoding": "gzip, deflate",
    #"Accept-Language": "zh-CN,zh;q=0.8",
    "Cookie":  'OUTFOX_SEARCH_USER_ID=-1768822506@123.160.227.67; JSESSIONID=aaaGatvLVzoKP8R95bBdw; OUTFOX_SEARCH_USER_ID_NCOO=383562009.05245006; fanyi-ad-id=39535; fanyi-ad-closed=1; ___rl__test__cookies=1515503271654i=%E4%BD%A0%E7%9C%9F%E5%B8%85&from=AUTO&to=AUTO&smartresult=dict&client=fanyideskweb&salt=1515503271660&sign=937c7ad09eab03107d6fdf0aca4787b2&doctype=json&version=2.1&keyfrom=fanyi.web&action=FY_BY_CLICKBUTTION&typoResult=false'
}
#######################################################################
# 定义ua
ua = [
    "Mozilla/5.0(Macintosh;U;IntelMacOSX10_6_8;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50",
    "Mozilla/5.0(Windows;U;WindowsNT6.1;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50",
    "Mozilla/5.0(compatible;MSIE9.0;WindowsNT6.1;Trident/5.0;",
    "Mozilla/4.0(compatible;MSIE8.0;WindowsNT6.0;Trident/4.0)",
    "Mozilla/4.0(compatible;MSIE7.0;WindowsNT6.0)",
]
# 随机获取一个ua
user_agent = random.choice(ua)

# 定义url地址
url = "http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule"
# 定义表单数据
form_data = {
    "i": n,# 要翻译的词语
    "from":	"AUTO", # 词语的翻译之前的语言
    "to":	"AUTO", # 词语翻译之后的语言
    "smartresult": "dict", # 数据类型
    "client":	"fanyideskweb", # 客户端标识
    "salt":	r, # ~~~~可能是~~~时间
    "sign":	sign,# ~~~~可能是~~~~md5
    "doctype":	"json", # 数据类型
    "version":	2.1,# 版本号
    "keyfrom":	"fanyi.web",# 关键字
    "action":	"FY_BY_REALTIME",# 行为描述
    "typoResult":	False # 结果类型
}
data = urllib.urlencode(form_data)

# 封装请求对象
request = urllib2.Request(url, data=data, headers=headers)
request.add_header("User-agent", user_agent)

# 发送请求获取响应数据
response = urllib2.urlopen(request)

# 打印展示数据
print(response.read())