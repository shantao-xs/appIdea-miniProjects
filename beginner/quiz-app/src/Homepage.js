//始终占据80%的viewport
import { useNavigate } from 'react-router-dom';
//todo 分割成三个板块，日常练习，限时挑战（时长限制），每日随机。日常联系可以自定义时长，领域，难度；限时挑战可以自定义难度（时长固定2min增加倒计时时钟）；每日随机random 时长，领域，难度。题型都是单选题
//todo 点击new quiz要刷新，而不是停留不变

function Homepage(){
    const navigate = useNavigate();
    function handleNewQuiz(){
        navigate('/quiz');
    }

    return(
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '85vh' }}>
            <h1 className="flex-grow-1 d-flex align-items-center">Welcome to the Quiz App!</h1>
            <div  className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                <p>50+ Fields, 10000+ Quizs, 3 Levels of Difficulty...</p>
                <p>Click the button below to start a quiz.</p>
            </div>
            <div className="flex-grow-1">
                <button className="btn btn-lg btn-outline-primary flex-grow-1" onClick={handleNewQuiz}>Take a Quiz Right Now!</button>
            </div>
        </div>
    );
}

export default Homepage;