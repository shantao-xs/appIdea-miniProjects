# HZ-HIKING-FINDER-APP

## step1. data crawling
为什么要模拟登录emulate login？
很多网站需要用户登录才能获取信息，所以必须先模拟登录，才能爬取数据

### 怎么开展？
#### 1. 前置知识
##### HTTP basics：request和response
1. request请求  
request methods:
- GET获取数据
  - ?key1=value1&key2=value2
- POST提交数据
  - 

##### crawl core logic
1. download
  请求什么url/api接口？
  获得什么？（html/json）
2. extract
3. save

#### 2. 抓包分析
要抓什么？网站-url/APP-api接口
要传递什么参数给Response？GET-query parameter/POST-body JSON

- 学习node.js，尝试前后端分离搭建全栈项目
- 学习python爬虫和restful api（用python写，然后用react的fetch来抓取数据GET）
- 学习数据库（爬虫数据储存）
- js改成ts，create-react-app改成vite，沿用tailwind

#### 3. 写码实现


https://realpython.com/web-scraping-with-scrapy-and-mongodb/


python爬虫-转为JSON数据-用pymongo写入mongoDB-用python写restful api用于查找数据（这里可以增删查改？管理员用户两个端口，管理员可以增删查改，用户可以收藏评论报错推荐）-在前端react发起GET请求