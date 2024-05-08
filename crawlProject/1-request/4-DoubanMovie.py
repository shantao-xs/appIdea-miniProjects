import requests
import json
# todo 如何实现持续地下拉爬取并存入mongodb：https://blog.csdn.net/andux/article/details/133761283

if __name__ == '__main__':
    url = 'https://movie.douban.com/j/chart/top_list' #为什么是这个url呢？从哪里的来的呢？
    params = {
        'type':'11', #分类：如11是剧情
        'interval_id': '100:90', #好于100%-90%的剧情片
        'action': '',
        'start': '1', #起始页
        'limit': '20', #抓取上限（这里不考虑翻页的问题）
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }

    response = requests.get(url=url,params=params,headers=headers)
    list_data = response.json()
    fp = open('./4-recordDoubanMovie.json','w',encoding='utf-8')
    json.dump(list_data,fp,ensure_ascii=False)

    print('ending!')