#coding:utf-8

import urllib2
url="http://www.renren.com/963228286/profile"
headers={
"Host":"www.renren.com",
"Connection":"keep-alive",
"Cache-Control":"max-age=0",
# "Upgrade-Insecure-Requests":"1",
"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
# "Accept-Encoding":"gzip, deflate",
"Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8",
"Cookie":"anonymid=jcfye2bbngr7s8; depovince=HEN; _r01_=1; JSESSIONID=abcVjzI36oNaOagdi94dw; ick_login=49805880-6bcf-4faf-acaf-e697a607f50a; jebe_key=69623c21-d3c0-44e8-a2fb-675df728e3c1%7Ccfcd208495d565ef66e7dff9f98764da%7C1516005262322%7C0%7C1516005259970; _de=434112D5EA6A61C8ED28A3DCFE45556D; t=44e9d51866b2f8f0d9b8cdb3bbefafff6; societyguester=44e9d51866b2f8f0d9b8cdb3bbefafff6; id=963228286; xnsid=709a89c; jebecookies=a15bf12e-50e0-434e-abdf-c9ccf53cbf17|||||",


}
request=urllib2.Request(url,headers=headers)
response=urllib2.urlopen(request)
print response.read()