# -*- coding: utf-8 -*-
import scrapy
from ..items import TengxunItem

class TencentSpider(scrapy.Spider):
    name = 'tencentPt'
    allowed_domains = ['tencent.com']
    start_urls = ['http://hr.tencent.com/position.php?keywords=python&lid=2218&tid=87&start=0']

    def parse(self, response):
        url=response.urljoin(self.start_urls[0])
        yield scrapy.Request(url,callback=self.parse_response)

    def parse_response(self,response):

        job_list=response.xpath("//tr[position()>1]")
        print job_list
        for select in job_list:
            positionname = select.xpath(".//td[1]/a/text()").extract_first()

            # 详情链接
            positionlink = select.xpath(".//td[1]/a/@href").extract_first()

            # 职位类型
            positiontype = select.xpath(".//td[2]/text()").extract_first()
            # 招聘人数
            peoplenum = select.xpath(".//td[3]/text()").extract_first()
            # 工作地点
            worklocation = select.xpath(".//td[4]/text()").extract_first()
            # 发布时间
            publishtime = select.xpath(".//td[5]/text()").extract_first()
            item=TengxunItem()
            item['positionname']=positionname
            item['positionlink']=positionlink
            item['positiontype']=positiontype
            item['peoplenum']= peoplenum
            item['worklocation']=worklocation
            item['publishtime']= publishtime
            yield item
            # yield item

        next_page=response.xpath("//div[@class='pagenav']/a/@href").extract()
        #循环处理请求
        for page in next_page:
            page=response.urljoin("http://hr.tencent.com/"+page)
            yield scrapy.Request(page,callback=self.parse_response)
            # print "http://hr.tencent.com/"+page