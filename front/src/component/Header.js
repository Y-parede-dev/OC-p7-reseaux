import logo from '../logo.svg';
import '../styles/Header.css';

function Header(){
    const titleHeader = "groupomania"
    return (
        <header className="App-header">
            <div className="header-title">
                <h1>{titleHeader}</h1>
                <img src={logo} className="App-logo" alt="logo Groupomania" />
            </div>
            <ul>
                    <li>
                        <a href='http//localhost:3001/api/auth/signup'>Crée un nouveau compte</a>
                    </li>
                    <li>
                        <a href=''>se connecter</a>
                    </li>
                </ul>
        </header>
        
    )
}

export default Header;
