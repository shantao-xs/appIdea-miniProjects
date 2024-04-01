import React, { useState} from 'react';
import QuizItem from './QuizItem';
//? 箭头函数和函数调用的区别？为什么是onClick={handleStart}而不是onClick={()=>{handleStart}}? 普通函数：渲染就执行，箭头函数：检测到事件（比如click）时执行
function QuizItemsList(props){
    const{score,setScore,quizs,setUserAnswers,userAnswers,timeRange,setTimeRange,quizCompleted,setQuizCompleted} = props;
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    //BEFORE START
    function beforeStart(){
        function handleStart(){
            setShowQuiz(true);
            setStartTiming();
        }
        return (
            <div className='d-flex flex-column align-items-center justify-content-center'>
                    <h1 className='my-5'>Quiz Now Start!</h1>
                    <h5 className='mt-5 mb-3'>Your score and timing will be recorded and compared on the leaderboard. </h5>
                    <h5>Be accurate and fast!</h5>
                    <button className='btn btn-lg btn-outline-primary my-5' onClick={handleStart}>Start Quiz!</button>
            </div>
        )
    }

    //TIMER
    function setStartTiming(){
        const curTime = new Date();
        setTimeRange(prev=>({
            ...prev,
            startTime:curTime
        }));
    }

    function setEndTiming(){
        const curTime = new Date();
        setTimeRange(prev=>({
            ...prev,
            endTime:curTime
        }));
    }
        
    //QUESTION FORWARD & BACK
    function handleNextQuestion(){
        setCurrentIndex(curIndex => curIndex + 1);
        console.log(score);
    }

    function handleLastQuestion(){
        setCurrentIndex(curIndex => curIndex -1);
    }

    function handleSubmit(){
        setEndTiming();
        setQuizCompleted(true);
    }
        
    //{beforeStart}与beforeStart()，前者是函数，react不能渲染对象，但是能够直接调用函数并返回它所设定的要return的jsx对象
    return(
        <div>
            {!showQuiz && beforeStart()}
            {showQuiz && (
                <div>
                    <ul>
                        {quizs && quizs.length > 0 && quizs.map((quiz,questionindex)=>(
                                <li key={questionindex} style={{ display: questionindex === currentIndex ? 'block' : 'none' }}>
                                    <QuizItem 
                                        quiz={quiz} questionIndex={questionindex} 
                                        userAnswers={userAnswers} setUserAnswers={setUserAnswers}
                                    />
                                </li>
                            )
                        )}
                    </ul>
                    <div>
                        {currentIndex >0 && (
                        <button onClick={handleLastQuestion}>Last Question</button>
                        )}
                        {currentIndex === quizs.length - 1 ?
                            (<button onClick={handleSubmit}>Submit</button>) :
                            (<button onClick={handleNextQuestion}>Next Question</button>)
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizItemsList;