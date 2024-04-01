//在react里图片的引用必须先引入路径（相对路径）
import imgURL from './images/logo.png';

import { NavLink } from 'react-router-dom';
//todo useroute是不是可以单独写个js文件？
function Header() {
    return(
      <header>
       <nav className="navbar bg-primary" style={{ height: '15vh' }}>
          <div className="container-fluid d-flex justify-content-center align-items-center">
            <a className="navbar-brand d-flex flex-row align-items-center" href="#">
              <img src={imgURL} alt="Logo" style={{ height: '10vh' }} />
              <h3>QuizApp</h3>
            </a>
            <ul className="navbar-nav d-flex flex-row justify-content-center me-auto ">
              <li className="nav-item ms-5 me-3"><NavLink to="/" className="nav-link">Homepage</NavLink></li>
              <li className="nav-item mx-3"><NavLink to="/quiz" className="nav-link">New Quiz</NavLink></li>
              <li className="nav-item mx-3"><NavLink to="/record" className="nav-link">My Record</NavLink></li>
            </ul>
            <span className="navbar-text">
              <h5>Different Quiz Every Day!</h5>
            </span>
          </div>
        </nav>


      </header>
    );
  }

  
export default Header;