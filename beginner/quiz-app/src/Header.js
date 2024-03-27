//这部分固定存在
import { NavLink } from 'react-router-dom';
//todo useroute是不是可以单独写个js文件？
function Header() {
    return(
      <header>
        <h1>QUIZ APP</h1>
        <nav>
          <ul>
            <li><NavLink to="/">Homepage</NavLink></li>
            <li><NavLink to="/quiz">New Quiz</NavLink></li>
            <li><NavLink to="/record">My Record</NavLink></li>
          </ul>
        </nav>
      </header>
    );
  }

  
export default Header;