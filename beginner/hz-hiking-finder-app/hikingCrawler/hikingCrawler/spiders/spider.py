# step2. 写爬虫文件
import json
import random
import time
import scrapy
from scrapy.spiders import Spider
from ..items import HikingcrawlerItem #从上级文件中导入：..文件名 import 要导入的对象（这里是一个类）
import urllib.parse
from ..config import cookies,data

# **Cookies的处理：**你在start_requests方法中传递了cookies，但更好的做法是在settings.py文件中设置COOKIES_ENABLED为True，并使用COOKIES模块管理cookie。
# **翻页逻辑：**你已经在parse方法中实现了翻页逻辑，但是对于动态网站来说，更好的方式是使用Scrapy自带的LinkExtractor从页面中提取链接。
# **代码可读性：**在处理爬虫的逻辑时，尽量让代码清晰易懂。可以考虑将一些逻辑提取出来，比如创建Item对象的逻辑。
# **提取数据的方法：**在parse_current_page方法中，你只提取了每页前4条数据，这种方法可能会导致信息不完整。考虑提取全部数据并在后续处理中限制数量。
# **XPath选择器：**在parseDetail方法中，你使用了XPath选择器来提取body信息，确保你的XPath表达式能够准确地定位到目标元素。
# **异常处理：**在解析response时，最好包含异常处理，以应对可能出现的网络错误或解析错误。

class HikingSpider(Spider):
    name = "hikingSpider"
    allowed_domains = ['mp.weixin.qq.com']

    # todo 要爬取多个公众号，strat_url和cookie都随着公众号变化
    # 动态网站，定义翻页的页码begin={?}
    url='https://mp.weixin.qq.com/cgi-bin/appmsg'
    #使用cookie跳过登录操作



    user_agent_list = [
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/45.0.2454.85 Safari/537.36 115Browser/6.0.3',
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
        'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
        'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0',
        'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Mobile Safari/537.36",
    ]

    #伪装成浏览器，需要headers，包括user-agent，cookie，connection等
    headers = {
        'Connection': 'keep - alive',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36',
        'Cookie': cookies,
    }


    #启动爬虫
    #todo scrapy.Request还是response.follow? 使用 scrapy.Request 创建新的请求对象，可以提供更多的定制选项，比如指定请求方法、请求头、请求体等；response.follow 是 scrapy.Response 对象的一个便捷方法，用于创建新的请求对象，并跟随给定的链接进行访问
    def start_requests(self):
        headers = self.headers.copy()  # headers是字典，字典是引用，故需要复制不改变原始值
        headers['User-Agent'] = random.choice(self.user_agent_list)
        url_concat_params = '{}?{}'.format(self.url, urllib.parse.urlencode(self.data))

        #随机延时，模拟人类
        delay = random.randint(5,25)
        time.sleep(delay)
        #yield：声明一个request对象，等待回调的时候执行parse函数（异步）
        yield scrapy.Request(url=url_concat_params, headers=headers)

    # 创建一个item对象，把当前该条信息的这些属性存入管道
    def createItem(title,digest,link):
        item = HikingcrawlerItem()
        item['title'] = title
        item['digest'] = digest
        item['link'] = link
        # newItem['cover'] = appMsgList[i]['cover'] 这个是封面图片
        return item

    # 接收response并解析
    # 具体想提取什么数据，看devtool里的response部分，这里提取的是app_msg_list数组里的信息
    # 想要在parse和parseDetail里分别提取信息到同一个实例，详见下文备注里的meta参数方法；如果只需要跟进链接，则yield response.follow(link,
    # self.parseDetail)即可，不需要用meta来打包传递newItem这个实例
    def parse_current_page(self,response):
        result = json.loads(response.body)  # todo json.loads?
        appMsgList = result['app_msg_list']
        items=[]
        #（每页有4条，提取app msg list的前4条）
        for i in range(4):
            item = self.createItem(appMsgList[i]['title'],appMsgList[i]['digest'], appMsgList[i]['link'])
            items.append(item)
            request = scrapy.Request(url=item['link'], callback=self.parseDetail, meta={'item': item})
            yield request
        return items


    # todo 注意这里的response包含的信息不止页面上显示的4条，只需要提取前4，后面的顺序不对很多信息重复，具体如何待核实
    def parse(self, response):
        # 爬取当前页
        current_page_items = self.parse_current_page(response)
        yield from current_page_items # yield from: 把这个list里的数据逐个yield，而不是一股脑yield一个list

        #翻页爬取
        for page in range(1,10):
            next_data = self.data.copy()
            next_data['begin'] = str(4*page)

            delay = random.randint(30,60)
            time.sleep(delay)

            headers=self.headers.copy()
            headers['User-Agent']=random.choice(self.user_agent_list)
            url_concat_params = '{}?{}'.format(self.url, urllib.parse.urlencode(next_data))
            yield scrapy.Request(url=url_concat_params, headers=headers)

    def parseDetail(self,response):
        #同样的，这里的newItem和parse method里的是同一个HikingcrawlerItem实例
        newItem = response.meta['item']
        newItem['body'] = response.xpath('//*[@id="activity-detail"]').extract_first()
        yield newItem













