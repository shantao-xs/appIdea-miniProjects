 //todo 1. 能把二进制转换为十进制（需要读取input里的文本值） 2. 碰到非二进制的输入会警告
 //todo 修改字体，学会本地和url引用字体
//* 正则的写法，怎么应用到js

const form = document.querySelector('.inputs');
const submit = document.querySelector('#submit-1');
const input = document.querySelector('[name=input-1]');
const results = document.querySelector('.results');
const switchConvert = document.querySelector('#switchConvert');

let inputText;
let isBinToDec = true;
const regexBin = /^[01]+$/;
const regexDec = /\d+/;

input.placeholder = 'please enter 0 or 1 here (up to 8 digits)';
//! 注意防止默认刷新！这个问题卡了好久 
//! 注意toggle时改变标题颜色：这里在改innerHTML的时候，直接改内部正文，不要再嵌套一个h1，不然会打乱结构
// *如果想用onclick，对于要接收event的元素，需要在html里传入参数event - onclick(func(event))
//! addeventlistener 和 onclick区别？
/**addeventlistener 和 onclick区别: addeventlistener可以对同一元素绑定多个事件按顺序依次执行，但onclick只能绑定一个；前者对所有DOM元素有效而不仅仅是对html元素
 * 精简写法（如果除了绑定事件外不需要对这个元素进行其他的处理）：
 * document.getElementById("idName").addEventListener('click',func)
 * document.getElementById("idName").onclick = func
 * */ 
//! queryselector 和 getelementby 的区别? getelementby获得动态集合，会随着文档的改变而改，queryselector是静态的，特别体现在【ul-li结构有更新时】;queryselector 需要接收css选择符，getelementby要搭配id,tagname,classname使用，对应获取id/标签名/类名的元素，且直接写名字而不用加比如是('.className' '#idName')


function toggleConvert(e){
    e.preventDefault();
    console.log('change');
    const heading = document.querySelector('#heading');
    const headingHL = document.querySelector('#headingHL');
    isBinToDec=!isBinToDec;
    input.placeholder = isBinToDec ? 'please enter 0 or 1 here (up to 8 digits)' : 'please enter number here (0-255)';
    heading.innerHTML = isBinToDec ? `<span id="headingHL" class="highlight">Bin</span>2Dec Calculator` : `<span id="headingHL" class="highlight">Dec</span>2Bin Calculator`;
}


//! 注意，虽然isBinToDec是一个全局变量，但是在函数里，必须先传入它才能够正确调用它的值！
function handleSubmit(e){
    
    e.preventDefault();
    inputText = form.querySelector('[name=input-1]').value;
    console.log(inputText);
    if(isBinToDec){
        if(regexBin.test(inputText)){
            binToDec(inputText);
        }else{
            displayError('numBin');
        }
    }else{
        if(regexDec.test(inputText)){
            decToBin(inputText);
        }else{
            displayError('numDec')
        }
    }   
    form.reset(); //注意：监听的是谁，触发事件的是谁，取值的主体是谁，要清空谁的信息？
}


//为了避免临时增加results导致页面下移，要在页面初次加载.results时设置一个占位并且隐藏它，如<h3 style="visibility: hidden;">xxxxx</h3>
function binToDec(binary){
    let decimal=0;
    if(binary.length>8){
        displayError('lengthBin');
    }else{
        for(let i=0;i<binary.length;i++){
            decimal=decimal*2+parseInt(binary[i]);
        }
        results.innerHTML = `
            <h3>The answer is: ${decimal}.</h3>
        `;
    }
}

function decToBin(decimal){
    if(decimal>255){
        displayError('lengthDec');
    }else{
        const binary = (decimal >>> 0).toString(2);
        results.innerHTML = `
            <h3>The answer is: ${binary}.</h3>
        `;
    }
}


//! innerHTML会直接更新页面上的内容，而不需要return
function displayError(reason){
    if(reason==='lengthBin'){
        results.innerHTML = `
        <h3>Invalid input. Input is only up to 8 binary digits.</h3>
        `;
    }
    if(reason==='lengthDec'){
        results.innerHTML = `
        <h3>Invalid input. Can only convert number ≤ 255.</h3>
        `;
    }
    if(reason==='numBin'){
        results.innerHTML = `
        <h3>Invalid input. Must contain only 0 and 1.</h3>
        `;
    }
    if(reason==='numDec'){
        results.innerHTML = `
        <h3>Invalid input. Must contain only numbers.</h3>
        `;
    }
}

submit.addEventListener('click',e=>{handleSubmit(e)});
input.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
        handleSubmit(e);
    }
});
