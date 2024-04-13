# book finder app notes: react, tailwind, etc.
## how to make a LOCAL project

### 用create react app创建react app（下次补充为vite）
```javascirpt
npx create-react-app my-app
cd my-app
npm start
```

### HTML文件
用!自动创建一个html
创建根元素 `<div id="root"></div>`  
引入css样式文件（来自tailwindcss）`<link href="../src/output.css" rel="stylesheet">`

### index.js
- 把集成组件App渲染到HTML的根元素root上（以严格模式渲染React.StrictMode）
```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### App.js
- 核心组件，汇集所有的组件并进行布局
- 获取初始数据
  - 从第三方api异步获取初始数据
    - 异步获取fetch-then或async-await
- 配置路由Router（从quiz app更新笔记）
- 状态管理，管理所有的state（用useState）

### Componnet.js
- 写具体的组件，集合进React里


## IMPLEMENTATION: book finder app
### 总体步骤
先了解api逻辑，再想要什么功能，再延伸到组件分布和状态管理，最后实现function

### step1. 了解api逻辑并实现 e.g. Google books api
| api接口 | 实现api接口的对应function | 状态管理 |
|----------|---------------|----------|
| https://www.googleapis.com/books/v1/volumes?q=${encodedSearchTerms}&startIndex=${startIndex}&maxResults=${maxResultsPerPage}&key=${API_KEY}${ifSelectLanguage}   |
| Cell 4   | Cell 5   | Cell 6   |



## FLASH-CARD
1. 什么是封装？
- 函数封装：封装为有独立的、可重复使用的功能，有清晰的接口可以直接调用，让代码更加组块化。
- 具体的应用：可以作为props传递给子组件

2. 

## NEXT-TO-DO
-[] 尝试定制tailwind
-[] 使用typescript进行debug
-[] 使用vite替代create-react-app
-[] 使用DB
-[] 尝试部署，区分dev和prod