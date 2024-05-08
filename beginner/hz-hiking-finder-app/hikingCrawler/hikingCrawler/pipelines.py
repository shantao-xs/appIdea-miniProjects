# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
#!!! 注意，每次打开mongodb compass 的时候，要记得mongod打开mongodb的服务器，由于data存放位置被配置在了E盘，所以需要mongod --dbpath E:\MongoDB\Server\7.0\data


import pymongo

class MongoDBPipeline:
    def __init__(self,mongo_uri,mongo_db,mongo_collection):
        self.mongo_uri= mongo_uri
        self.mongo_db = mongo_db
        self.mongo_collection = mongo_collection

    @classmethod
    #获取爬虫的配置信息，从settings.py导入
    def from_crawler(cls,crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGODB_URI'),
            mongo_db = crawler.settings.get('MONGODB_DATABASE','HangzhouHikingCrawler'), #后者是默认值
            mongo_collection=crawler.settings.get('MONGODB_COLLECTION', 'hikingActivities')
        )

    #在爬虫开始时调用，即初始化，创建和mongodb客户端的连接，选择制定的数据库（HangzhouHikingCrawler）
    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        self.collection = self.db[self.mongo_collection]



    #处理爬到的item信息（已经从spider.py那里被传入了pipeline），存入mongoDB
    #todo 有没有别的方法？如果已经有同名且同链接的信息存在就不录入
    def process_item(self, item, spider):
        if spider.name == 'hikingSpider':
            if 'title' in item.keys():
                itemExisted = self.collection.find_one({'link':item['link']})
                if itemExisted is None:
                    self.collection.insert_one(dict(item))
        return item

    #爬虫关闭
    def close_spider(self, spider):
        self.client.close()