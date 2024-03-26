# Border Radius Previewer
什么是border radius？

## 功能
- css borders | 可以交互调整一个box的四个border
- copy to clipboard | 可以把调整后的css代码复制下来

### 进阶
可以改变border radius的全8个属性，包括设置两个值，可以一并控制水平和垂直方向的半径

## 知识点
1. [copy to clipboard](https://www.w3schools.com/howto/howto_js_copy_clipboard.asp)

怎么体现工具提示 tooltip？鼠标悬浮的时候会出现一个小型弹出窗口
1. 监听该元素（文本：浮窗），click时/mouseout时
2. 在click时，把文本更新为想要的值（比如copyText.value)
3. 在mouseout后，刷新文本为原来的文本
4. **tooltip的相对位置问题？**