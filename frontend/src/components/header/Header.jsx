import './header.css'
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div className="App">
          <header className="App-header">
            <div className="page-logotype">
                  <Link className="logo-link" to={'/'}>
                      <img src={logo} alt="Focus Timers Logo"/>
                      <h1>FOCUS TIMERS</h1>
                  </Link>
              </div>
              <div className="navegation-container">
                  <nav>
                      <ul>
                          <li><Link to={'/pomodoro'}>Pomodoro</Link></li>
                          <li><Link to={'/login'}>Log In</Link></li>
                          <li><Link to={'/signin'}>Sign In</Link></li>
                          <li><Link to={'/sesions'}>Sesions</Link></li>
                          <li><Link to={'/about'}>About</Link></li>
                      </ul>
                  </nav>
                  <a href="https://www.buymeacoffee.com/algorithmicpaws"><button className="donation-button"></button></a>
              </div>
          </header>
        </div>
      );
}
export default Header;