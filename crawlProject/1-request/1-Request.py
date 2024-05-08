#using request package to GET data from target url, and save it to local

import requests

if __name__ == "__main__":
    url = 'https://github.com/shantao-xs?tab=repositories'
    response = requests.get(url=url)
    pageText = response.text
    with open('./recordRequest.html','w',encoding='utf-8') as fp:
        fp.write(pageText)
    print("ending!")