#-*- coding:utf-8 -*-

import urllib
import urllib2

def LoadPage(url,filename):
    '''

    :param url:需要爬取的url地址
    :param filename:处理文件名
    作用：根据url发送请求，获取服务器响应数据
    :return:
    '''
    print "正在下载"+filename
    headers ={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    }
    request =urllib2.Request(url,headers=headers)
    response=urllib2.urlopen(request)
    return response.read()
def WritePage(html,filename):
    '''
    作用:将HTML内容写到本地
    :param html:服务器相应文件的内容
    :return:
    '''
    print "正在保存"+filename
    with open(filename.decode("utf-8"),"w") as f:
        f.write(html)

def TieBaSpider(url,beginPage,endPage):
    '''
    作用：贴吧爬虫调度器，负责组合处理每个页面的url
    :param url: 贴吧url的前部分
    :param beginPage:起始页
    :param endPage:结束页
    :return:
    '''
    for page in range(beginPage,endPage+1):
        print page
        pn=(page-1)*50
        filename= "第" +str(page)+"页.html"
        full_url=url +"&pn="+str(pn)
        print(full_url)
        html= LoadPage(full_url,filename)
        #print html
        WritePage(html,filename)
        print '谢谢使用'

#http://tieba.baidu.com/f?kw=python&ie=utf-8&pn=50
#http://tieba.baidu.com/f?kw=python&ie=utf-8&pn=50&pagelets=frs-list%2Fpagelet%2Fthread&pagelets_stamp=1515588174594

if __name__=='__main__':
    kw =raw_input("输入爬取的贴吧名字")
    beginPage=int(raw_input("输入起始页"))
    endPage=int(raw_input("输入结束页"))
    url="http://tieba.baidu.com/f?"
    key=urllib.urlencode({"kw":kw})
    print key
    full_url=url+key
    print full_url
    TieBaSpider(full_url,beginPage,endPage)



