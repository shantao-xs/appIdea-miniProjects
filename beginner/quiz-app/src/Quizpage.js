//要在这里展示quiz的内容，先异步fetch api，然后提取想要的数据
//todo 排查计分错误的问题
import React, { useState, useEffect } from 'react';
import "./style.css";
import QuizItemsList from './QuizItemsList';
import QuizResult from './QuizResult';

function Quizpage() {
    //! 保险起见，所有状态变量应该通过setXXX来更新，而不是更新全局变量（为什么？）
  const [quizs, setQuizs] = React.useState([]);  
  const [quizCompleted, setQuizCompleted] = React.useState(false);  
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState({
    startTime:0,
    endTime:0
  })
  

  //! useeffect，usereact只能在函数组件（顶层）或者hooks里使用
  //todo useeffect也是一个hook？干嘛的？
  //异步获取第三方api上的数据并存入quizs array
  //! StrictMode下useEffect会跑两次（development mode，prod mode则不影响） 临时阻止跑两次：用 if(!data.result) return来防止在数据异步获取完成前就执行
  React.useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple')
    .then(response => response.json())
    .then(data => {
      if (!data.results) {
        return;
      }
      const decodeQuizs = data.results.map((result,i)=>({
            index:i,
            question: result.question,
            answers:[result.correct_answer, ...result.incorrect_answers],
            correct:result.correct_answer,
            userAnswers:''
      }));
      setQuizs(decodeQuizs);

    })
    .catch(error => {
            console.error('Error fetching data:', error);

        });
  
  },[])

  //todo 增加一个isloading的状态

  return(
    <div style={{ height: '85vh' }}>
      {!quizCompleted && 
        <QuizItemsList 
        quizs={quizs} 
        userAnswers={userAnswers} setUserAnswers={setUserAnswers} 
        timeRange={timeRange} setTimeRange={setTimeRange}
        quizCompleted={quizCompleted} setQuizCompleted={setQuizCompleted}/>
      }
      {quizCompleted &&
        <QuizResult 
        quizs={quizs}
        userAnswers={userAnswers}
        timeRange={timeRange}/>
      }
    </div>
  );
}


export default Quizpage;




//! 因为是异步获取api，和return是同时执行的，所以不仅仅在fetch的时候要map array，在return里也要通过map来展现，不然fetch还没执行完已经函数return完了
//! 返回HTML实体编码比如&quot;的解码方法：用he库来解码。npm install he + import he from 'he' + he.decode(context);
//* ul和li的呈现格式
//! 一般react里不用addeventlistener而是用onclick，如果要执行多个函数，可以用函数嵌套的方式
//! 回调函数：为了避免onClick={storeAnswer(quiz.answers[0],quiz.correct)}让函数立即执行引发too many re-renders，需要用回调函数
//todo map问题：为什么我已经用了quizs?.map()或者quizs && quizs.map()，还是会报错Cannot read properties of undefined (reading 'map')？再次刷新后就不会？
//! 要让几个按钮在同一组里（达到单选的效果），他们应该有一样的name