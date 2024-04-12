const controllers = document.querySelectorAll('.display-control input');
function handleChange(){
    const suffixPX = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`,this.value+suffixPX);
}
//! input-range event的区别：拖动滚动条即刻变化：input；拖完滚动条后变化：change
controllers.forEach(controller=>controller.addEventListener('input',handleChange));


function handleCopy(e) {
    e.preventDefault();
    //怎么读取元素的css样式border radius
    //! 注意，因为myInput元素是动态生成的，这里需要getelementby而不是queryselector
    let targetElement = document.getElementById("rcorners");
    let elementStyle = window.getComputedStyle(targetElement);
    let borderRadius = {
        topLeft:elementStyle.borderTopLeftRadius,
        topRight:elementStyle.borderTopRightRadius,
        bottomLeft:elementStyle.borderBottomLeftRadius,
        bottomRight:elementStyle.borderBottomRightRadius,
    }
     //复制到剪贴板，把js对象转为字符串格式：JSON.stringfy
    navigator.clipboard.writeText(JSON.stringify(borderRadius));

    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML  = "Copied!";

    //把复制的文字更新在网站上
    const showCopyElement = document.getElementById('showcopy');
    navigator.clipboard.readText().then(text=>showCopyElement.textContent=text);
  }

function outFunc() {
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}



