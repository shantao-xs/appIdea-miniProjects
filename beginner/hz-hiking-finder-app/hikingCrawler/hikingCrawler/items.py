# step1. 定义数据表的字段(Field)，爬取的数据条目实例（Item），会把数据存储在相应字段中
# 本次定义标题，正文，url这3个字段。
# todo 暂时不提取图片

from scrapy.item import Field, Item

class HikingcrawlerItem(Item):
    title=Field()
    digest=Field()
    body=Field()
    link=Field()
