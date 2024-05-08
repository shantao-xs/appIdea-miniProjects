# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Field


class WechatSpiderItem(scrapy.Item):
    title=Field()
    body=Field()
    url=Field()

    pass

class WechatImageItem(scrapy.Item):
    image_urls=Field()