#-*-coding:utf-8-*-
#豆瓣
#url:https://movie.douban.com/typerank?type_name=%E5%89%A7%E6%83%85&type=11&interval_id=100:90&action=
#URL：https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0
import urllib
import urllib2
import re
import os
File_Path = os.getcwd()[-1]+'data\\'      #获取到当前文件的目录，并检查是否有此文件夹，如果不存在则自动新建文件
if not os.path.exists(File_Path):
    os.makedirs(File_Path)
else:
    url='https://movie.douban.com/j/search_subjects?type=movie '

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    }
    tags=["热门","经典","最新","可播放"]
    tag =raw_input("输入选择的类别")
    if tag in tags:
        start=raw_input("输入起始数")
        nums=raw_input('选择数量')
        formdata={
        "type":	"movie",
        "tag":tag,
        "sort":"recommend",
        "page_limit":nums,
        "page_start":start,
        }
        data=urllib.urlencode(formdata)

        request=urllib2.Request(url,data=data,headers=headers)
        response=urllib2.urlopen(request)
        re_list=response.read()
        print re_list
        # t_list= re.findall(r'"title":"(.*?)"',re_list)
        # s_list=re.findall(r'"rate":"(.*?)"',re_list)
        # c_list=re.findall(r'"cover":"(.*?)"',re_list)
        re_pattern = re.compile(r'"rate":"(?P<rate>.*?)".*?"title":"(?P<title>.*?)".*?cover":"(?P<cover>.*?)"')
        movie_list = re.findall(re_pattern,re_list)
        tag = (tag+"电影").decode("utf-8").encode("gbk")
        movies=""
        for movie in movie_list:
            rate=movie[0]
            title=movie[1]
            cover=movie[2]
            movieinfo="电影："+title+"\n评分："+rate+"\n封面："+cover
            movies =movies+movieinfo+'\n'

            with open('%s/%s.txt'%(File_Path,tag) ,'a') as f1:
                f1.write(movies)

    else:
        print("选择有误，核对后输入")