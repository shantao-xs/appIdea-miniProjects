#爬取图片

import requests
import urllib3
#禁止使用安全请求
# todo 为什么？
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

#中文乱码：
def rebuit_language(url,headers):
    response=requests.get(url=url,headers=headers,verify=False)
    return response

if __name__ == '__main__':
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
