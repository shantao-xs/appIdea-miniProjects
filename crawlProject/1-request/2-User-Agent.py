# User Agent and 反爬虫策略应对。 useragent是身份标识，假装浏览器在搜狗引擎上进行关键词搜索
import requests

if __name__ == "__main__":
    url = 'https://www.sogou.com/web?'

    #用UA套身份牌来伪装成浏览器
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }

    #查询字符串的参数，跟在?的后面，可以设置如page, limit等
    #用input进行交互
    kw = input('enter a word:')

    #把url中的查询字符串的参数封装到字典params里，包括page，limit等都可以设置
    params = {
        'query': kw,
        'page':1,
        'limit':2
    }
    response = requests.get(url=url,params=params,headers=headers)

    page_text = response.text
    with open ('./recordUA.html','w',encoding='utf-8') as fp:
        fp.write(page_text)
    print('ending!')

