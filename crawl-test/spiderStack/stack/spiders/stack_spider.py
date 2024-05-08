from scrapy import Spider
from scrapy.selector import Selector

from ..items import StackItem

#主要问题：1.xpath选错元素 2.过时的语句导致无法应用

class StackSpider(Spider):
    # download
    name = "stack_spider" #注意！这个就是爬虫的名字，需要启动这个爬虫
    allowed_domains = ["stackoverflow.com"]
    start_urls = [
        "http://stackoverflow.com/questions?pagesize=50&sort=newest",
    ]


    #注意用xpath selector来选择想要选取的元素，并且在devtool里用$x'...'来检验选择是否正确
    def parse(self, response):
        # extract
        questions = Selector(response).xpath('//h3[@class="s-post-summary--content-title"]')
        for question in questions:
            item = StackItem()
            item['title'] = question.xpath('./a[@class="s-link"]/text()').extract_first()
            item['url'] = question.xpath('./a[@class="s-link"]/@href').extract_first()
            yield item
            #什么是yield？


