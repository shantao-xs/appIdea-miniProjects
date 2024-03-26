# bin2dec calculator

## 功能
### 样式上
1. 用switch切换转换功能时，标题h1和input的placeholder都会发生变化
2. 鼠标悬浮到两个按钮上时，都会有小手标记
3. input框可以submit也可以通过enter完成转换
4. 鼠标悬浮到switch按钮上时，会在input框下方浮现该按钮的功能说明

### 功能上
1. 可以进行二进制→十进制，十进制→二进制转换，通过左侧switch按钮切换转换功能
2. 对超出范围或不合规的数字，会主动报错

### 数据上
1. 应requirements的要求，不是用array做的

## 步骤
1. **tbc**

## 知识点
### JS
1. 在碰到表单、卷轴等情况下，一定要注意防止默认刷新！
- `e.preventDefault(); `
- 如果无法察觉但是函数不会动，可以打开console看一下是否会闪退

2. 怎么在函数里更改某个html元素的样式
- 使用element.innerHTML =  `<具体样式></具体样式>`
- 注意：如果elent已有样式比如\<h1>，就不要在里面嵌套一个\<h1>元素

2. 2.1 如果是在函数里新增某个元素， 怎么防止新元素出现破坏原有布局？
- 为了避免临时增加results导致页面下移，要在页面初次加载.results时设置一个占位并且隐藏它，如`<h3 style="visibility: hidden;">xxxxx</h3>`

3. 使用全局变量时还要把它作为参数传入函数吗？
- 不需要，以防万一也可以传参

4. 关于表单常有哪些元素？
- form下有input,submit等

5. 怎么清空input框？
- `form.reset();` 注意：要清空的是form的信息

6. 怎么提取input的值？
- 选中input text元素，并读取它的值，如`form.querySelector('[name=input-1]').value;`

7. onclick怎么使用？
- 如果想用onclick，对于要接收event的元素，需要在html里传入参数event - onclick(func(event))

8. addeventlistener 和 onclick区别？
- addeventlistener可以对同一元素绑定多个事件按顺序依次执行，但onclick只能绑定一个；前者对所有DOM元素有效而不仅仅是对html元素
- 精简写法（如果除了绑定事件外不需要对这个元素进行其他的处理）：
    - document.getElementById("idName").addEventListener('click',func)
    - document.getElementById("idName").onclick = func

8. 8.1 **DOM和thml元素的区别？**
- DOM有各种类型的node节点比如elementNode，documentNode等，比如document就是一个documentNode。elementNode元素节点是其中一类，元素是用HTML标记比如\<h1>来表示的

9. queryselector 和 getelementby 的区别? 
- getelementby获得动态集合，会随着文档的改变而改，queryselector是静态的，特别体现在【ul-li结构有更新时】;
- queryselector 需要接收css选择符，getelementby要搭配id,tagname,classname使用，对应获取id/标签名/类名的元素，且直接写名字而不用加比如是('.className' '#idName')


### HTML
1. 怎么给一个icon增加button效果？
- 创建一个button，在里面包含这个icon的来源

### CSS
1. 鼠标悬浮在指定元素上时，出现某个新元素
如：
```css
<span class="tooltip">Switch calculation method</span>
```
- 对tooltip施加伪类效果，让原本隐藏（`display: none;`）的元素出现
```css
#switchConvert:hover .tooltip {
    display: block;
}
```
    
2. 怎么一键备注隐藏/取消备注某句话？
- 使用`ctrl + /`

3. 怎么精确设置元素大小，不让border，margin等造成干扰？
- `box-sizing: border-box;`可以让元素的高度包括边框和内边距，从而更准确地控制元素的大小

4. 怎么让元素之间有间隔？
- `margi:10px,0;` 上下边距10，左右0。

5. 怎么让parent元素内的子元素们居中上下对齐？
- flex布局。`justify-content: center;` + `align-items: center;`

## todo-next
1. 尝试一下不同的字体？
2. 尝试更好看的样式？