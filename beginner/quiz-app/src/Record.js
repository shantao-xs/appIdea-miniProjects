import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


//!!! 注意！！！如果是需要Record组件应用的方法，就应该写在record组件里，不然不会生效！卡了很久
//todo 什么是location？
function Record(){
    const location = useLocation();
    const [showDetails, setShowDetails] = useState(false);
    const score = location.state ? location.state.score : null;
    const startTime = location.state ? location.state.startTime : null;
    const endTime = location.state ? location.state.endTime : null;

    // function handleShowDetails(){
    //     setShowDetails(true);
    // }
    // function showDetails(){

    // }

    function showTime(startTime,endTime){
        console.log("startTime:", startTime);
        console.log("endTime:", endTime);

        if(startTime != null && endTime != null){
            const difference = (endTime-startTime)/1000;
            const mins = Math.floor(difference/60);
            const secs = Math.floor(difference%60);
            return(
                <p className='text-primary fs-4'>Time Spent: {mins} {mins>1?'minutes':'minute'} {secs} {secs>1?'seconds':'second'}</p>
            );
        }else{
            return <p>No time record yet.</p>;
        }
    }

    //todo 增加retry跳转quizpage
    function scoreOrQuiz(score){
        if(score != null){
            return (
                <div className='flex-grow-1 d-flex flex-column align-items-center'>
                    <p>the score is: {score}</p>
                    {isPassed(score)}
                    <button className='btn btn-primary'>Check the details</button>
                </div>
            );
        }else{
            return (
                <div className='flex-grow-1 d-flex flex-column align-items-center'>
                    <p>No records yet. Please take a quiz first!</p>
                    <NavLink to="/quiz"><button className='btn btn-outline-primary btn-lg my-5'>Take a Quiz</button></NavLink>
                </div>
            )
        }
    }

    function isPassed(score){
        if(score>=6){
            return(
                <p>Congratulations, you pass!</p>
            )
        }else{
            return(
                <p>Unfortunately, you fail.</p>
            )
        }
    }


    return(
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '85vh' }}>
            <h1 className='flex-grow-1 d-flex align-items-center'>Your Quiz Records</h1>
            {scoreOrQuiz(score)}
            {showTime(startTime,endTime)}
        </div>
    )
}

export default Record;