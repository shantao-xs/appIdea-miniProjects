import logging

import pymongo
from scrapy.exceptions import DropItem
from . import settings #同级文件从.引入

#注意要用getattr来获取setting这个module object里面的具体属性，记录数据的时候用logging.info，插入单个用self.collection.insert_one
class MongoDBPipeline(object):
    def __init__(self):
        connection = pymongo.MongoClient(
            getattr(settings, 'MONGODB_SERVER'),
            getattr(settings, 'MONGODB_PORT')
        )
        db = connection[getattr(settings, 'MONGODB_DB')]
        self.collection = db[getattr(settings, 'MONGODB_COLLECTION')]

    #save
    def process_item(self, item, spider):
        valid = True
        for data in item:
            if not data:
                valid = False
                raise DropItem("Missing {0}!".format(data))
        if valid:
            #将单个文档插入集合
            self.collection.insert_one(dict(item))
            logging.info("Question added to MongoDB database!")
        return item