import React from 'react';
import { useLocation } from 'react-router-dom';
//todo 什么是location？
//todo 增加retry跳转quizpage
function Record(){
    const location = useLocation();
    const score = location.state ? location.state.score : null;
    return(
        <div>
            <h1>horaaaaaay!</h1>
            <p>the score is: {score}</p>
        </div>
    )
}

export default Record;