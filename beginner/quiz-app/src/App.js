import Header from "./Header";
import Homepage from "./Homepage";
import Quizpage from "./Quizpage";
import Record from "./Record";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//确保这个板块占据整个viewport而不是固定大小：vh-100
//* 用router库来跳转导航不同的页面
//! 路由：React Router6要用element而不是component组件来指定要渲染的组件，卡在这里很久。注意渲染的组件是不是用JSX格式写的，这个也卡住很久。
//* 什么是JSX格式？可以在js文件中写类HTML语言比如<Homepage />

//todo 为什么这里设置的style={{ height: '80vh' }}没有用？
function App() {
  return (
    <Router>
      <div className="vh-100 d-flex flex-column">
        <Header/>
        <Routes>
          <Route exact path="/" element={<Homepage className="style={{ height: '80vh' }}"></Homepage>} />
          <Route path="/quiz" element={<Quizpage className="style={{ height: '80vh' }}"></Quizpage>} />
          <Route path="/record" element={<Record className="style={{ height: '80vh' }}"/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
