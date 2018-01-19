# -*- coding:utf-8 -*-
'''
https://image.baidu.com/search/acjson?
tn=resultjson_com
&ipn=rj&word=%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1
&pn=0
&rn=1

任务：爬取百度图片
1.抓包确定目标地址
2.确定图片数量是由哪些参数决定的
3.爬虫爬取对应的数据[JSON]  -- 爬取百度图片页面数据

4.获取真实图片地址，保存在一个列表中
5.下载图片  -- 爬虫，循环遍历真实图片地址列表中的每个url地址，urlopen(url)->response.read()->write(...)
'''
import urllib2
import urllib
import random, re


###########################获取百度图片搜索到的图片列表JSON数据###################################
# 定义用户代理
ua = [
    "Mozilla/5.0(Macintosh;U;IntelMacOSX10_6_8;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50",
    "Mozilla/5.0(Windows;U;WindowsNT6.1;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50",
    "Mozilla/5.0(compatible;MSIE9.0;WindowsNT6.1;Trident/5.0;",
    "Mozilla/4.0(compatible;MSIE8.0;WindowsNT6.0;Trident/4.0)",
    "Mozilla/4.0(compatible;MSIE7.0;WindowsNT6.0)",
]
user_agent = random.choice(ua)

# 定义请求头
my_headers = {
    "Referer": "https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1&oq=cike&rsp=0",
    "Cookie": "BDqhfp=%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1%26%260-10-1undefined%26%260%26%261; BAIDUID=8EFAA54B443ECE7E9312EBBD80537F7C:FG=1; PSTM=1515372101; BIDUPSID=A0D261EF2F827FC1BDB3BC6553861182; FP_UID=6ce9f9662c2e1e36942444636a9fb4e6; BDUSS=VKRldPSUttTWlEa2NnYWZDTEZ3NVM1dzNDUThKUVZCSDh6cGJkRE13N2pzWHBhQUFBQUFBJCQAAAAAAAAAAAEAAAD6d6UMeHVleXVsYW5tbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOMkU1rjJFNaVj; pgv_pvi=1383708672; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BDRCVFR[X_XKQks0S63]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; firstShowTip=1; indexPageSugList=%5B%22%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1%22%2C%22%E6%B8%B8%E6%88%8F%E7%BE%8E%E5%A5%B3%22%2C%22%E7%BE%8E%E5%A5%B3%22%2C%22%E6%95%B0%E6%8D%AE%E5%BA%93%22%2C%22%E7%A8%8B%E5%BA%8F%E4%BB%A3%E7%A0%81%22%2C%22%E7%A5%9E%E7%9B%BE%E5%B1%80%E6%A1%8C%E9%9D%A2%E5%A3%81%E7%BA%B8%E9%AB%98%E6%B8%851920x1080%22%2C%22%E7%BB%BF%E7%AE%AD%E4%BE%A0%E6%A1%8C%E9%9D%A2%E5%A3%81%E7%BA%B8%E9%AB%98%E6%B8%851920x1080%22%2C%22%E8%9C%98%E8%9B%9B%E4%BE%A0%E6%A1%8C%E9%9D%A2%E5%A3%81%E7%BA%B8%E9%AB%98%E6%B8%851920x1080%22%2C%22%E9%BB%91%E5%AE%A2%20%E5%A3%81%E7%BA%B8%22%5D; cleanHistoryStatus=0; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; userFrom=null"
}

# get参数
get_params = {
    "tn": "resultjson_com",
    "ipn": "rj",
    "word": "美女",
    "pn": 0,
    "rn": 10000
}
param = urllib.urlencode(get_params)

# 请求地址
url = "https://image.baidu.com/search/acjson?"
full_url = url + param

# 构建请求对象
print("正在抓取数据..............")
request = urllib2.Request(full_url, headers=my_headers)
request.add_header("User-agent", user_agent)

# 发送请求获取响应数据
response = urllib2.urlopen(request)
content = response.read()
###########################获取百度图片搜索到的图片列表JSON数据###################################

###########################筛选数据得到所有的图片地址数据并爬取图片###################################
print("数据抓取完成.分析筛选数据")
img_re_list = re.findall('"thumbURL":"(.*?)"', content)
print(img_re_list)

# 有必要的，但不是必须的！检测图片path路径是否正确,如果图片路径中出现了特殊的转义符号~需要在这里进行转换
img_list = []
for img in img_re_list:
    print(">>>新增图片链接：%s" % img)
    img_list.append(img)
################################


for img_url in img_list:
    print(">>>>>>保存图片%s" % img_url)

    request = urllib2.Request(img_url, headers=my_headers)
    request.add_header("User-agent", user_agent)
    response = urllib2.urlopen(request)

    img_url = img_url.replace("/", "_")
    with open('bd_img/' + img_url[-50:], "wb") as f:
        f.write(response.read())

    print("#################图片%s保存完成" % img_url)
###########################筛选数据得到所有的图片地址数据并爬取图片###################################

