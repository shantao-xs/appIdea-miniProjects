import Header from "./Header";
import Homepage from "./Homepage";
import Quizpage from "./Quizpage";
import Record from "./Record";
import "./style.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//* 用router库来跳转导航不同的页面
//! 路由：React Router6要用element而不是component组件来指定要渲染的组件，卡在这里很久。注意渲染的组件是不是用JSX格式写的，这个也卡住很久。
//* 什么是JSX格式？可以在js文件中写类HTML语言比如<Homepage />
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage></Homepage>} />
          <Route path="/quiz" element={<Quizpage></Quizpage>} />
          <Route path="/record" element={<Record />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
