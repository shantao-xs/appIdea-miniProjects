import React, {useState} from 'react';
import he from 'he';
function QuizResult(props){
    const {quizs,userAnswers,timeRange} = props;
    const startTime = timeRange.startTime;
    const endTime = timeRange.endTime;
    const [isShowDetails,setShowDetails] = React.useState(false); 

    //Calculate Time
    const timeSpent = ()=>{
        const difference = (endTime-startTime)/1000;
        const mins = Math.floor(difference/60);
        const secs = Math.floor(difference%60);
        return(
            <p>
                time spent: {mins} minutes : {secs} seconds
            </p>
        )
    }

    //Calculate Score
    const scoreEarned = ()=>{
        let score=0;
        for(let i=0;i<quizs.length;i++){
            if(quizs[i].correct=== userAnswers[i]){
                score++;
            }
        }
        return score;
    }

    //* 表格：标题thead和表身tbody，tr-table row，th-table header cell表头,td-table data数据单元格。
    const showDetails = ()=>{   
        return(
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Question</th>
                        <th>Correct Answer</th>
                        <th>Your Answer</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {quizs.map((quiz,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{he.decode(quiz.question)}</td>
                                <td>{he.decode(quiz.correct)}</td>
                                <td>{userAnswers[index]}</td>
                                <td>{quiz.correct===userAnswers[index]?'√':'×'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    //! 注意，不能再showDetails()方法里进行setShowDetails(true)，而应该用onclick来控制，不然会导致每次渲染时都要更新setShowDetails(true)
    //! scoreEarned与scoreEarned():后者是立即执行一次函数，前者则是一个对一个函数的引用（没有执行）
    return(
        <div>
            <h1>Your Record</h1>
            <p>score: {scoreEarned()}</p>
            {timeSpent()}
            {!isShowDetails && (
                <button onClick={()=> setShowDetails(true)}>check the details</button>
            )}
            {isShowDetails && showDetails()}
        </div>
    )
}

export default QuizResult;