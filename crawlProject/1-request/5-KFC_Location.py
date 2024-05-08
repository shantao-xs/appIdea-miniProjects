import os
import requests
import json

if __name__ == '__main__':
    place = input('enter a place:')
    page = 1

    # 确定文件打开模式
    mode = 'a' if page == 1 else 'w'

    url = 'http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=keyword'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }

    # 遍历翻页，并全部录入json文件中
    # 如果重新检索，清空文件内容重写，否则每爬完一页都换一行然后续写
    for i in range(0, 6):
        params = {
            'cname': '',
            'pid': '',
            'keyword': place,  # 查询地点
            'pageIndex': page,  # 查询页码
            'pageSize': '10',  # 每页最多显示10个
        }
        response = requests.post(url=url, params=params, headers=headers)
        list_data = response.text

        if page == 1:
            mode = 'w'
        else:
            mode = 'a'

        with open('./5-recordKFClocation.json', mode, encoding='utf-8') as fp:
            if mode == 'w' and i == 0:
                fp.write('')  # 清空文件内容
            json.dump(list_data, fp, ensure_ascii=False)
            fp.write('\n')  # 爬完一页换行
            page += 1

    print('ending!')
