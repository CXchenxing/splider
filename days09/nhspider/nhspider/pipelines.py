# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo

class NhspiderPipeline(object):
    def process_item(self, item, spider):
        return item

class NhdzPieline(object):

    def __init__(self):
        client = pymongo.MongoClient('localhost', 27017)  # 定义数据库名称，集合名称
        self.client=client['local']['nhdz']


    def process_item(self,item,spider):

        data={
            "content":item['content'],
            "nickname":item['nickname'],
            "datetime":item['datetime'],
            "like":item['like'],

        }
        print ">>>>>>>>>>>>>>>>  neihan pipelines iswoking....."
        self.client.insert(data)