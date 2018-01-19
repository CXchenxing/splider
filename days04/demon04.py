# coding:utf-8

"""
正则在爬虫中进行数据筛选
案例：百度图片
思路：
1.抓包得到获取数据的url地址
2.抓取url地址对应的数据
2.1正则匹配需要的数据[图片url路径]
3.循环抓取图片
3.1. 保存图片到本地
"""
# 引入需要的爬虫模块，和正则匹配模块
import requests,re

#抓取数据的路径
url = "http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E5%9B%BE%E7%89%87&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&word=%E5%9B%BE%E7%89%87&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=&fr=&pn=30&rn=30&gsm=1e&1515679212577="
#请求头
headers = {
    "Connection":"keep-alive",
    "Accept":"text/plain, */*; q=0.01",
    "X-Requested-With":"XMLHttpRequest",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
    "Referer":"http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gbk&word=%CD%BC%C6%AC&fr=ala&ala=1&alatpl=others&pos=0",
    "Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8",

}
#1.第一次爬取，得到具体的图片展示数据
response1 = requests.get(url,headers=headers)
response1.encoding = "utf-8"
content = response1.text


#正则匹配得到图片path路径，后续根据这个路径爬取图片
img_list =re.findall(r'"thumbURL":"(.*?)"',content)
print(img_list)

#3.循环爬取图片数据，保存到本地
for img_url in img_list:
    print(">>>>>>>>>>开始保存图片%s" % img_url.encode("utf-8"))
    response2=requests.get(img_url)

    #开始存储图片
    filename=img_url[-50:].replace("/","_")
    with open("images/%s"%filename,"wb") as f:
        f.write(response2.content)

    print("<<<<<图片保存完成")