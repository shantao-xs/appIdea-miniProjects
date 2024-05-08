# 1 request-GET请求
面向目标url发起request
用get返回response object
提取该object里的数据：response.text
储存数据到本地 
```python
with open('/path','w',encoding='utf-8') as fp: 
    fp.write(...)
```

# 2 UserAgent伪装浏览器
伪装成浏览器：配置headers里的useragent（通过network-headers-request headers-user agent来找到）
用url的查询字符串参数来限定target search content：把参数写在字典里，会自动配置，比如limit，query，page等

# request-POST请求
get和post的区别？
get方法的参数在url中
post方法的参数在body中

据说post比get更安全，因为数据不直接显示在url地址栏上，但是body也会被明文抓包，也没安全到那里去


获取响应对象的方法有哪些？
response.json()：自动解析，返回json格式的数据，前提是server提供的数据就是json的
response.text：返回server提供的原始文本内容，比如html，xml，json等

open打开模式有哪些？open('path','mode',encoding='utf-8')
r只读
w写入覆盖
a追加，写入文件末尾

open与close
fp.open()
fp.close()

# 用lxml库解析html
1. UA伪装