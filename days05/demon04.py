#coding:utf-8
import requests
from lxml import etree

headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.7 Safari/537.36",
}

url ="http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%8C%97%E4%BA%AC%2B%E4%B8%8A%E6%B5%B7%2B%E5%B9%BF%E5%B7%9E%2B%E6%B7%B1%E5%9C%B3&kw=python%E5%B7%A5%E7%A8%8B%E5%B8%88&p=1&isadv=0"
#发送请求，获取智联网页数据
response=requests.get(url,headers=headers)
html_str =response.text
################3
#xpath匹配目标数据
html=etree.HTML(html_str)
print(html)#
#1.xpath匹配数据:注意原始HTML数据和网页中的数据可能不一致
job_names=html.xpath("//div[@id='newlist_list_content_table']/table[@class='newlist']/tr[1]/td[@class='zwmc']/div/a")
print(job_names)

f = open("job.txt", "w")
for job_name in job_names:
    # print job_name.text
    f.write(job_name.xpath("string(.)").strip().encode("utf-8") + "\r\n")
f.close()