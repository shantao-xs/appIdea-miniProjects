//要在这里展示quiz的内容，先异步fetch api，然后提取想要的数据
//todo 排查计分错误的问题
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import he from 'he';

function Quizpage() {
    //! 保险起见，所有状态变量应该通过setXXX来更新，而不是更新全局变量（为什么？）
  const [quizs, setQuizs] = React.useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score,setScore] = useState(0);

  const [curAnswer,setCurAnswer] = React.useState([]);
  const [curCorrect,setCurCorrect] = React.useState([]);
  const navigate = useNavigate();
  //todo 到底什么是hook？比如usenavigate


  //异步获取第三方api上的数据并存入quizs array
  React.useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple')
    .then(response => response.json())
    .then(data => {
      const decodeQuizs = data.results.map(result=>({
            question: result.question,
            answers:[result.correct_answer, ...result.incorrect_answers],
            correct:result.correct_answer
      }));
      setQuizs(decodeQuizs);
    })
  },[])
  
  function handleNextQuestion(){
    setCurrentIndex(prevIndex => prevIndex + 1);
    checkAnswer();
    console.log(score);
  }

  function handleLastQuestion(){
    setCurrentIndex(curIndex => curIndex -1);
  }

  function storeAnswer(selectAnswer,correctAnswer){
    setCurAnswer(selectAnswer);
    setCurCorrect(correctAnswer);
  }

  //todo 这个计分方式不对，再看
  function checkAnswer(){
    if(curAnswer===curCorrect){
        setScore(score=>score+1);
    }
  }

  //! 用useNavigate来进行router里的页面导航，并传递参数（score分数）
  //todo 传参的三种办法 https://blog.csdn.net/fe13162458806ng/article/details/136232371
  function handleSubmit(){
    checkAnswer();
    console.log('total: '+score);

    navigate('/record',{ state: { score: score } });
  }
  
//! 因为是异步获取api，和return是同时执行的，所以不仅仅在fetch的时候要map array，在return里也要通过map来展现，不然fetch还没执行完已经函数return完了
//! 返回HTML实体编码比如&quot;的解码方法：用he库来解码。npm install he + import he from 'he' + he.decode(context);
//* ul和li的呈现格式
//! 一般react里不用addeventlistener而是用onclick，如果要执行多个函数，可以用函数嵌套的方式
//! 回调函数：为了避免onClick={storeAnswer(quiz.answers[0],quiz.correct)}让函数立即执行引发too many re-renders，需要用回调函数
  return(
    <div>
      <h2>The QUIZ now START!</h2>
      <ul>
        {quizs && quizs.map((quiz,index)=>
          <li key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
            <div className="question-item">
                <span>{index+1}</span>
                <p className="question-content">{he.decode(quiz.question)}</p>
                <div className='question-options'>
                    <label htmlFor="optionA">
                        <input type="radio" name="optionA" value="0" onClick={()=>storeAnswer(quiz.answers[0],quiz.correct)}/>
                        {quiz.answers[0]}
                    </label>
                    <label htmlFor="optionB">
                        <input type="radio" name="optionB" value="1" onClick={()=>storeAnswer(quiz.answers[1],quiz.correct)}/>
                        {quiz.answers[1]}
                    </label>
                    <label htmlFor="optionC">
                        <input type="radio" name="optionC" value="2" onClick={()=>storeAnswer(quiz.answers[2],quiz.correct)}/>
                        {quiz.answers[2]}
                    </label>
                    <label htmlFor="optionD">
                        <input type="radio" name="optionD" value="3" onClick={()=>storeAnswer(quiz.answers[3],quiz.correct)}/>
                        {quiz.answers[3]}
                    </label>
                </div>
            </div>
          </li>
        )}
      </ul>
      <div className="btn">
        {currentIndex >0 && (
          <button onClick={handleLastQuestion} className='btn-quiz'>Last Question</button>
        )}
        { currentIndex === quizs.length - 1 ?
            (<button onClick={handleSubmit} className='btn-quiz'>Submit</button>) :
            (<button onClick={handleNextQuestion} className='btn-quiz'>Next Question</button>)
        }
      </div>
    </div>
  );
}


export default Quizpage;