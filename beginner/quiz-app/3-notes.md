# 3 quiz app
## 功能

## 步骤


## 知识点
1. 怎么使用api
2. 怎么使用react：1. 让每个部分的功能都独立（组件化），可以分别控制 2.只会渲染修改了的DOM元素而不是整个DOM树，提高性能 3.**生命周期方法**
3. 搭配react使用jsx语言（可以直接写类html语言了，不用手动调用document.createElement了）：需要加载编译器babel，并为需要转换jsx语言的代码添加类型：type="text/jsx"
4. 调用bootstrap（原始版本）参与设计

### react
app.js vs index.js：
index.js: 项目入口文件，启动App，在这里把App挂载render到`<root/>`元素上(index.html) + 引入dependency比如React，ReactDOM和别的库
app.js: 汇总所有的组件，样式文件，处理state等

style.css：渲染到app后会覆盖所有子组件，除非样式有改变

index.html：页面的入口，通过root元素接收app要渲染的东西

先用create-react-app创建一个react框架
npm start看实时更新


1. 组件

### API
要和第三方系统交互信息，需要ajax异步
fetch目标url（endpoint）
```javascript 
fetch('https://opentdb.com/api.php?amount=10')
```
异步进行处理
```javascript
.then(response => response.json())
  .then(data => {
    console.log(data);
  })
```
并catch error（暂时不做）

## 资源
自动生成问题的库：[trivia API](https://opentdb.com/api_config.php)
