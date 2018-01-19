#coding:utf-8
import scrapy
from .. import items
import json
import time
class NhdzSpider(scrapy.Spider):
    '''
    内涵段子爬虫程序
    '''
    #定义爬虫的名称用于在命令中调用
    name="nhspider"
    #定义域名限制，只能在xx下爬取数据
    allowed_domains=['neihanshequ.com']
    #定义初始的url地址
    start_urls=(
            'http://neihanshequ.com/bar/1/?is_json=1&app_name=neihanshequ_web&max_time=1516158935.0',
    )
    def parse(self, response):
        '''
        采集到数据之后自动执行的函数
        :param response:
        :return:
        '''
        # print response.body
        json_list=json.loads(response.body)
        lst=json_list['data']['data']
        for i in lst:
            s=i['group']
            content=s['content']
            nickname=s['user']['name']
            datetime1=s['create_time']
            datetime2=time.localtime(datetime1)
            datetime=time.strftime('%Y-%m-%d',datetime2)
            like=s['favorite_count']

            # print datetime

            # 封装成item对象
            item = items.NhdzItem()
            item['content'] = content
            item['datetime'] = datetime
            item['like'] = like
            item['nickname'] = nickname
            # # 将本次生成的item对象交给pippeline进行处理
            yield item






