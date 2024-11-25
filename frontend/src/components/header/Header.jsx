import './header.css'
import logo from '../../assets/images/logo.svg';
import user from '../../assets/images/user.svg';
import settings from '../../assets/images/settings.svg';
import logout from '../../assets/images/logout.svg';
import bmc from '../../assets/images/bmc-button.svg'
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
                            <li><Link to={'/sesions'}>Sessions</Link></li>
                            <li><Link to={'/about'}>About</Link></li>
                            <li id='desplegable'><Link to={'/account'}><img src={user} alt='Account' className="user-image"></img></Link>
                                <ul>
                                    <li><Link to={'/account'}><img src={user} alt='account'></img>Account</Link></li>
                                    <li><Link to={'/settings'}><img src={settings} alt='settings'></img>Settings</Link></li>
                                    <li><Link><img src={logout} alt='logout'></img>Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <Link to="https://www.buymeacoffee.com/algorithmicpaws" className='donation-button'><img src={bmc} alt="donation"></img></Link>
                </div>
            </header>
        </div>
    );
}
export default Header;