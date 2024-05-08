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
以此为例：
```js
https://www.googleapis.com/books/v1/volumes?q=${encodedSearchTerms}&startIndex=${startIndex}&maxResults=${maxResultsPerPage}&key=${API_KEY}${ifSelectLanguage}
```

### step2. 组件的编写
待转换格式


### step2. 组件的样式实现（tailwindcss）

#### 前期准备：

1. 安装tailwindcss：https://tailwindcss.com/docs/installation
    
    1. create-react-app不能支持tailwind的高级样式和定制，下次用vite试一下
        
    2. 三个文件：
        
        - config配置-放在全局
            
        - input.css-导入@tailwind base/components/utilities
            
        - output.css-自动生成
            
2. tailwindcss定制：在tailwind.config.js的theme-extend里新增样式 https://tailwindcss.com/docs/adding-custom-styles
    
3. 在index.js导入output.css文件，让样式应用
    

  

#### tailwind常用缩写

color

- 背景/文字/边框颜色：bg/text/border-_colorName_-_500_
    

  

text

- 大小：从xs~9xl
    
- 字体
    
- 缩行：line clamp
    

  

space

- 外边距margin：m
    
- 内边距padding：p
    
- 范围：0~96...
    
- 方向
    
    - 上/下/左/右：t/b/l/r
        
    - 上下/左右：x/y
        

  

size

- 宽width：w
    
- 高height：h
    
- 宽高（大小）size：size
    
- 范围：
    
    - 固定大小：w-1固定大小
        
    - 比例：w-1/2占据50%宽度 / size-full填充整个父元素
        
    - 极值大小：min-w-*
        

  

flex布局

- 主要用法-在parent container：
    
    - 确定方向：flex flex-col/flex-row
        
    - xy轴居中：justify-center / items-center
        
- 主要用法-在sub items：
    
    - 分配多余空间：flex-1 / flex-0
        
    - 确定初始尺寸：basis-1 / basis-2/3（搭配flex-grow等使用，常用于响应式设计）
        

  

grid布局

- 在parent container：
    
    - 确定列数：grid grid-cols-6
        
    - 垂直间距：gap-y-2
        
    - 网格大小：w/h-*
        
- 在sub items:
    
    - 确定当前item宽度：col-span-2（占据容器的2/6=1/3）
        
    
      
    

darkmode（待实现）  


### step3. 统一管理状态和传递参数

当useState变得太过冗长……怎么进行管理？

1. 同类状态合并成数组 && 把独立的状态拆分到各个组件里
    

```JavaScript
const [searchParams, setSearchParams] = useState({ content: '', type: 'title', language: 'en' });

setSearchParams((prev) => ({ ...prev, content: 'newContent', type: 'newType', language: 'newLanguage' }));
```

2. 用useReducer汇总所有的状态
    

```JavaScript
const initialState = {
2  searchContent: '',
3  searchType: 'title',
4  searchLanguage: 'en',
5  searchResults: [],
6  startIndex: 0,
7  isLoad: false,
8  didSearch: false,
9  isSearching: false,
10};
```

- 用zustand管理状态(待实现)
    

  

  

### step4. 测试和调试

step1中已经写到，这里系统总结一下

#### 方法一：异常处理：try-catch或者console.log

```JavaScript
try{
    //执行语句
    //在这里可以用console.log实时调试
}catch(error){
    console.error('having problems when fetching: ',error)
}
```

  

#### 方法二：用tailwind类型声明，方便debug（待展开）

  

  

### react的生命周期

  

1. react的核心是组件，组件有两种：函数组件和类组件。这里只讨论前者。
    
2. 组件会组块化地展示内容，如何展示内容/**组件的生命周期是什么样的**？
    
    1. 总体逻辑：在react里用JSX语言编辑代码→react搭建一个虚拟DOM树→经过react编译后传给浏览器→react将各个组件（元素）插入浏览器的真实DOM树里。这个过程叫render。不用挂载的组件生命周期只有渲染，需要挂载的组件生命周期包括挂载-渲染-更新-卸载四个部分。
        
    2. 静态内容：调用function（有return）→render
        
    3. 动态内容：调用function（有return）→实例化（产生object）→mount挂载（把实例化的组件插入虚拟DOM树，表现为虚拟DOM元素）→render渲染（把虚拟DOM元素映射到真实DOM树里）→update（state改变/props改变导致的state改变时）→unmount
        
3. 怎么实现渲染render？
    
    1. 创建根元素并插入HTML DOM树中的对应元素里
        
    2. 集成组件到<App/>后，把<App/>渲染给该根元素
        
4. 怎么实现挂载？
    
    1. 在函数组件里，借助useEffect hook来挂载，`useEffect(()=>{function},[])`
        
    2. 什么时候不用挂载？只需要呈现静态内容时。某个函数内部调用了其他函数，useEffect只能在组件顶层使用，不能嵌套。
        
    3. 什么时候挂载？需要**实时调用**时
        
        - 要安装eventListener监听事件，根据事件变化**实时调用**时：比如这里的handleScroll来监听window.scrollY
            
        - 根据特定情况变化**实时调用**获取数据时


### 控制组件的显示，跳转和隐藏

- 变量控制渲染
    
    - boolean变量 `{isDisplay && <Page />}`
        
    - 状态变量 `{loadingStatus && <Page` `/``>}`
        
- 元素classname控制渲染 `<div className={isDisplay ? '具体样式' : 'none'}>`
    
- 条件渲染（三元表达式） `return isDisplay ? <Page /> : null;`
    
- 路由控制渲染 `<Route path="/page" component={Page} />`
    

  

路由的部分（待展开）

  

### React及JSX语法中其他常见问题

_模板字符串`${}`还是{}？_

_如果只要插入__js__表达式，在__jsx__中（类__html__语言中），只需要{}；如果要综合插入变量/表达式/字符串等，则需要用模板字符串`${}`_

  

怎么确认数组是否为空？

Array.isArray(targetArr)

  

怎么依次遍历数组里的值并且处理它们？

```JavaScript
arr.map(item=>{return(
    <div>...</div>
)})
```

  

怎么把数组里的数值用','连起来显示？

```JavaScript
arr.join(',')
```

  

怎么查找数组里的嵌套数据中是否具有某个属性？

```JavaScript
industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')
```

  

怎么导入并使用图片、动画？

作为**变量**或**组件**导入，在return里...

- 作为变量出现 `{...defaultPage}` 或 `<img src={defaultPage}/>`
    
- 作为组件调用 `<LoadingAnimation />`
    

```JavaScript
//images
import defaultPage from './images/default.jpg';
return(
    {...defaultPage}
)
return(
    <div>
        <img src={defaultPage} />
    </div>
)

//animation
import { ReactComponent as LoadingAnimation } from './images/loadingAnimation.svg';

return(
<div>
    <LoadingAnimation />
</div>
)
```

  

在react组件中怎么传递和接收参数？

- 传递参数
    
    ```JavaScript
    <SubComponent index={index} book={book}>
    ```
    
- 接收参数
    
    ```JavaScript
     //传统的接收方法
     function SubComponent(props){
         const [index,book] = props;
     }
     
     //简便接收
     const SubComponent = ({index,book})=>{
     
     }
    ```
    

  

### HTML常见问题

1. 尺寸信息和位置信息

- 窗口window
    
    - 窗口的内部高度：window.innerHeight
        
    - 窗口的滚动偏移量：window.scrollY
        
- 鼠标的位置
    
    - **鼠标**在视口中的位置：clientX，clientY
        
    - 鼠标在整个文档体的位置：pageX, pageY
        
- 文档体document
    
    - 整个文档<body/>的高度：document.body.offsetHeight
        
- 元素
    
    - 相对于父元素的位置（距左，距上）：offsetLeft,offsetTop
        

> 视口和窗口的区别？
> 
> 视口：浏览器中显示网页的部分
> 
> 窗口：整个浏览器，包括下拉条，地址栏，工具栏等
> 
> 文档体：整个网页（不管是现在显示的还是还没有显示到的）

  

2. 与窗口window的互动  
滑动到页面顶端：window.**scrollTo**({top:0,behavior:'smooth'});


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