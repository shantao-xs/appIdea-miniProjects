//一条quiz里的选项等
import he from 'he';
import React, { useState, useEffect } from 'react';
//! 注意input 单选按钮是通过onchange来更改，而不是通过onclick点击来监听的
//* useState和useEffect的区别：useState时异步更新状态，如果紧接着console.log等，并不能及时更新。通过useEffect(console.log,监听变量)来，在更新某个值后立即console.log，则会获得正确的值

function QuizItem(props){
    const {quiz,questionIndex,userAnswers,setUserAnswers} = props;

    useEffect(() => {
        console.log(userAnswers[questionIndex]);
    }, [userAnswers, questionIndex]);

    const handleAnswerSelected = (event)=>{
        //这里就用到了value
        const answerSelected = event.target.value;
        setUserAnswers(prevUserAnswers =>{
            const updatedUserAnswers = [...prevUserAnswers];
            updatedUserAnswers[questionIndex]=answerSelected;
            return updatedUserAnswers;
        }) 
    }

    return(
        <div>
            <h1>{questionIndex+1}</h1>
            <p>{he.decode(quiz.question)}</p>
            <div>
                {quiz.answers.map((answer,index)=>(
                    <div key={index}>
                        <input type='radio' onChange={handleAnswerSelected} id={`quiz${questionIndex}-option${index}`} name='answer' value={answer} />
                        <label htmlFor={`quiz${questionIndex}-option${index}`}>{answer}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuizItem;


