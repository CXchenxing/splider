# coding:utf-8
from bs4 import BeautifulSoup

#加载网页数据
#1.从爬虫获取到的网页数据加载
#soup=BeautifulSoup(response.text.encode("utf-8")
#2.从网页文件加载
soup=BeautifulSoup(open("index.html"),"lxml")
print (soup) #包含整个Dom模型树
##############################
#               re        xpath     bs4
#  安装          内置       第三方     第三方
#  语法          正则       路径匹配    面向对象
#  使用          困难        较困难      简单
#  性能          最高        适中       最低
##########################################
#PS：因为爬虫程序，一般情况下对于数据处理性能问题，涉及较少，所以
#对于爬虫采集数据。筛选数据并没有性能要求！[时间要求比较宽裕]
