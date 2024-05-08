import requests

if __name__ == "__main__":
    target_url = 'https://wz.sun0769.com/political/index/politicsNewest'
    response = requests.get(url=target_url)
    pageText = response.text
    with open('./sogou.html', 'w', encoding='utf-8') as fp:
        fp.write(pageText)
    print('爬取数据结束！')