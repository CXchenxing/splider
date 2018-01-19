#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Mr.Xie'
__date__ = '2018.01.09 19:34'
import urllib
import urllib2
import re
import pymongo


def get_url():
    key_list = ["热门", "最新", "经典", "可播放", "豆瓣高分", "冷门佳片", "华语", "欧美", "韩国", "日本", "动作", "喜剧", "爱情", "科幻", "悬疑", "恐怖", "治愈"]
    for i in key_list:
        key = urllib.urlencode({"tag":i})
        url = "https://movie.douban.com//j/search_subjects?type=movie&{0}&sort=recommend&page_limit=500&page_start=0".format(key)
        print(url)
        load_data(url)


def load_data(url):
    headers = {
        "Referer": "https://movie.douban.com/explore",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36"
    }
    req = urllib2.Request(url,headers=headers)
    json_str = urllib2.urlopen(req).read()
    re_pattern = re.compile(r'"rate":"(?P<rate>.*?)".*?"title":"(?P<title>.*?)".*?cover":"(?P<cover>.*?)"')
    movie_list = re.findall(re_pattern,json_str)
    save_to_db(movie_list)


def save_to_db(list):
    client = pymongo.MongoClient('localhost', 27017)  # 定义数据库名称，集合名称
    ceshi = client['douban']
    data_list = ceshi['data']
    for data in list:
        data_list.insert_one({"title":data[1],"rate":data[0],"cover":data[2]})


def save_to_txt(movie_list,json_str):
    with open('txt.txt','wa') as f:
        for  i in movie_list:
            movie = "电影名称:{}-----评分{}\n".format(i[1],i[0])
            f.write(movie)
    print(json_str.read())
    print(json_str)


def main():
    get_url()


if __name__ == '__main__':
    main()
