#coding:utf-8
#引入需要的scrapy模块
import scrapy
from .. import items
class ZhilianSpider(scrapy.Spider):
    '''
    智联招聘数据采集爬虫程序
    '''
    #定义爬虫的名称，用于在命令中调用
    name="zlspider"
    #定义域名限制：只能爬取~zhaopin.com域名下的所有数据
    allowed_domains=['zhaopin.com']
    #定义初始URL地址
    start_urls=["http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E4%B8%8A%E6%B5%B7%2b%E6%9D%AD%E5%B7%9E&kw=python&isadv=0&sg=63646014930d4e548758fda67e3f976c&p=1",]



    def parse_response(self,response):
        job_list = response.xpath("//div[@id='newlist_list_content_table']/table[position()>1]/tr[1]")
        for select in job_list:
            job = select.xpath("td[@class='zwmc']/div/a/text()").extract_first()
            # print job
            company = select.xpath("td[@class='gsmc']/a/text()").extract_first()
            salary = select.xpath("td[@class='zwyx']/text()").extract_first()

            # print job
            # print company
            # print salary
            # 封装成item对象
            item = items.ZhilianItem()
            item['job'] = job
            item['company'] = company
            item['salary'] = salary
            # 将本次生成的item对象交给pippeline进行处理
            yield item
            # print item
            # job_items.append(item)
            # 可以用于直接提取数据生成文件，但是如果涉及到数据存储完整程序~不推荐
            # why?因为完成的数据操作过程中，通过pipelines.py模块进行数据的验证、存储操作
            # return job_items
        next_page = response.xpath("//div[@class='pagesDown']/ul/li/a/@href").extract()
        for page in next_page:
            page = response.urljoin(page)
            # 重新发起请求采集下一组url地址的数据
            yield scrapy.Request(page, callback=self.parse_response)

    def parse(self, response):
        '''
        采集到数据之后，会自动执行的函数
        :param response:采集的数据
        :return:
        '''
        # filename=response.url.split("&")[-1]+".html"
        # with open(filename,"w") as f:
            #爬虫采集到的数据，会封装在response.body属性中，可以直接获取
            # f.write(response.body)
        # print response
        url = response.urljoin(self.start_urls[0])
        yield scrapy.Request(url,callback=self.parse_response)






