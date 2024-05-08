import requests
import json

if __name__ == '__main__':
    post_url = 'https://fanyi.baidu.com/sug'

    #用UA套身份牌来伪装成浏览器
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }

    #这里的data等价于GET里的params
    kw = input('enter a word:')
    data = {
        'kw': kw,
    }

    #确定响应对象的数据类型后返回之，这里是json类型
    response = requests.post(url=post_url,data=data,headers=headers)
    res_object = response.json()

    #存储本地文件：这里要存储json，要用到json.dump()方法，并允许存入中文等非ASCII字符
    with open ('./3-recordPost.json','w',encoding='utf-8') as fp:
        json.dump(res_object,fp,ensure_ascii=False)
        print('ending!')