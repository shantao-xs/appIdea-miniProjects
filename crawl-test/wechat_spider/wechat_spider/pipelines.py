from scrapy.exceptions import DropItem
from scrapy.pipelines.images import ImagesPipeline
import pymongo
import datetime
from scrapy.http import Request
#把数据存在json里
import json

class JsonWriterPipeline:
    def open_spider(self, spider):
        self.file = open('takenotes.json', 'w', encoding='utf-8')
        self.file.write("[\n")  # 开启一个数组

    def close_spider(self, spider):
        self.file.write("\n]")  # 结束数组
        self.file.close()

    def process_item(self, item, spider):
        line = json.dumps(dict(item), ensure_ascii=False) + ",\n"
        self.file.write(line)
        return item

#容易出错的问题：1.spider名称在spider.py和pipelines.py里不匹配导致无法启动；2.数据模型的属性在items.py和pinelines.py里不匹配导致数据抓不到
class WechatImagesPipeline(ImagesPipeline):
    def get_media_requests(self, item, info):
        if 'image_urls' in item.keys():
            for image_url in item['image_urls']:
                head_url = image_url[0: image_url.rfind('/')]
                last_name = head_url[head_url.rfind('/') + 1:len(image_url)]
                yield Request(image_url, meta={'name': last_name})

    def file_path(self, request, response=None, info=None):
        today = datetime.datetime.now().strftime('big/%Y/%m/%d')
        name = ''
        if '.' in request.meta['name']:
            name = request.meta['name'][0:request.meta['name'].rindex('.')]
        else:
            name = request.meta['name']
        result = "%s/%s.jpg" % (today, name)

        return result
        pass

    def item_completed(self, results, item, info):
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise DropItem("Item contains no images")
        return item

#todo 除了过滤同标题外，还有哪些要过滤？比如活动回顾
class WechatDetailPipeline(object):
    collection_name = 'hikingActivities'

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGODB_URI'),
            mongo_db=crawler.settings.get('MONGODB_DB')
        )
        pass

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def process_item(self, item, spider):
        if spider.name == 'stack':

            if 'title' in item.keys():
                itemAlreadyHave = self.db[self.collection_name].find_one({'url': item['url']})
                if itemAlreadyHave is None:
                    self.db[self.collection_name].insert_one(dict(item))
        return item
        pass

    def close_spider(self, spider):
        self.client.close()
        pass