import requests.utils
import scrapy
import json
import logging


from ..items import  WechatSpiderItem, WechatImageItem


class Wechat_accout_spider(scrapy.Spider):
    name = 'stack'
    allowed_domains = ['mp.weixin.qq.com']
    start_urls = [
        'https://mp.weixin.qq.com/cgi-bin/appmsg?action=list_ex&fakeid=MzA3ODM3NDE5NA%3D%3D&query=&begin=0&count=4&type=9&need_author_name=1&token=960607012&lang=zh_CN&f=json&ajax=1']
    # 动态网站需要有这个模板，这里begin={0}是会动态更新的数据，其他不变
    url_temple = 'https://mp.weixin.qq.com/cgi-bin/appmsg?action=list_ex&fakeid=MzA3ODM3NDE5NA%3D%3D&query=&begin={0}&count=4&type=9&need_author_name=1&token=960607012&lang=zh_CN&f=json&ajax=1'


    #爬取动态网站：要模拟浏览器登录的行为，所以需要cookie和useragent和headers
    #todo 具体是怎么起作用的？
    def start_requests(self):
        start_url = 'https://mp.weixin.qq.com/cgi-bin/appmsg?action=list_ex&fakeid=MzA3ODM3NDE5NA%3D%3D&query=&begin=0&count=4&type=9&need_author_name=1&token=960607012&lang=zh_CN&f=json&ajax=1'

        cookie_str = 'rewardsn=; wxtokenkey=777; pac_uid=0_dfcf64c333ca5; iip=0; _qimei_uuid42=183040b202410077e6e287cf6cc74d1fd2cbb1e4c3; _qimei_fingerprint=072165d2177b1ef2f7789b04f382e6d9; _qimei_q36=; _qimei_h38=fded8513e6e287cf6cc74d1f02000000218304; _qpsvr_localtk=0.52316751952924; poc_sid=HBQXDWajI3FF-HUdTksgQZcARwn-XUB_vwxiImGh; ua_id=xOvpisR9Bog9QQ1eAAAAACT7eIfxhUvNEbNW6o3ndFE=; _clck=htjc6y|1|fl1|0; wxuin=13410449838367; uuid=0c5fe47ef78119ac65c00323eb0d8ddd; rand_info=CAESINbFopTfJCwak5uCLoAXaePKSj2oKUO2QdAIhxwygpkn; slave_bizuin=3948685452; data_bizuin=3948685452; bizuin=3948685452; data_ticket=5JB1h83S+iP5AD2v0BX0SkefMYRx/iC9ee2LHVEi90p1ddeiFCYAN/OOXDLD1DNx; slave_sid=RmhIbFJTSlFUWFhFUTdzNVRpSDlUUl9OeWJJZF9TUVgxUjBjcm9JTXZlNnVUVWN1Ym0yZ1RTY0pDcDVjY0Ruek90VE9ZdDRWbkFIOW8zV3hGVUpPQm15SWpLazI0QlZQV01YcXNJTmx4TGRpUmdaR29sR0hUdzAwU01TRk1qVHpyUEFDM1hQTTNVMEVYTEQ5; slave_user=gh_8868330a39ad; xid=0b68d6f605204fffc25dd8f93dd6779e; mm_lang=zh_CN; _clsk=cae55v|1713425430188|1|1|mp.weixin.qq.com/weheat-agent/payload/record'
        cookie={c.split('=')[0]: c.split('=')[1] for c in cookie_str.split('; ')}
        headers = {
            'Connection': 'keep - alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
        }
        yield scrapy.Request(url=start_url, headers=headers,
                             cookies=cookie)

    #解析具体页面：抓取标题，正文，图片（可以用xpath也可以用css定位器定位）。注意图片不是json格式要单独导出
    # image不用提取所有，只需要提取首图。即<div id="js_row_immersive_cover_img" img src="..." alt="cover_image" </div>
    def parseDetail(self, response):
        title = response.xpath('//h1[ @id = "activity-name"]/text()').extract_first()
        all_text = response.xpath('//p/text()').getall()
        body=','.join(all_text)
        image_urls = response.xpath('//div[@id="js_row_immersive_cover_img"]/img/@src').extract_first()

        item = WechatSpiderItem()
        item['title'] = title
        item['body'] = body
        item['url'] = response.url  # 当前请求的响应的url，也就是该活动link
        yield item

        imageItem = WechatImageItem()
        imageItem['image_urls'] = image_urls
        yield imageItem
        pass  # 用来作为函数的收尾，不写也可以



    #在url的json文件中可以观察到https://mp.weixin.qq.com/cgi-bin/appmsg?action=list_ex&fakeid=MzA3ODM3NDE5NA%3D%3D&query=&begin=0&count=4&type=9&need_author_name=1&token=960607012&lang=zh_CN&f=json&ajax=1，它包括"app_msg_cnt":2303,"app_msg_list":[...,...,...]两个部分，故需要提取其中的'app_msg_list'部分，遍历之，对其中的每条数据进行解析
    def parse(self, response):
        # 在每一页文章列表中，解析每一个link
        # response包含headers,body等多个属性，需要提取其中的body，把它（原json结构）转换为python可处理的结构（list/dict）,通过key='app_msg_list'提取文章列表，遍历列表，并提取单篇文章的对应link，
        jsResult = response.body
        pyResult = json.loads(jsResult)
        if 'app_msg_list' in pyResult:
            articlesList = pyResult['app_msg_list']
            for article in articlesList:
                link = article['link']
                yield response.follow(link, self.parseDetail)
        else:
            logging.error("No 'app_msg_list' found in the response!")

        # 进行翻页，把next_url替换进url_temple的{0}占位符里，用yield让翻页继续执行直到j=9为止
        #todo 为什么抓取两页数据有64个？不是才8个吗？
        each_page_counts = 4
        max_count = pyResult['app_msg_cnt']

        for page in range(9):
            startIndex = int(each_page_counts * page)
            if(startIndex>max_count-1):
                logging.info("No new articles!")
            next_url = self.url_temple.format(startIndex)
            yield response.follow(next_url, self.parse)

        pass