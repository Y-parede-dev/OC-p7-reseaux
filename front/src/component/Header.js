import logo from '../logo.svg';
import '../styles/Header.css';


function Header({isConected, setIsConected}){
    const titleHeader = "groupomania";
    
    return (
        <header className="App-header">
            <div className="header">
                <h1 className='header-title '>{titleHeader}</h1>
                <img src={logo} className="App-logo" alt="logo Groupomania" />
            </div>
            {!isConected? <ul className="ul-sign-log">
                
                
                <li>
                    <a href='./signup'>Crée un nouveau compte</a>
                </li>
                <li>
                    <a id='login-link' href='./login' >se connecter</a>
                </li>
                
            </ul>: <ul className="ul-sign-log">
                
                <li>
                    <a className='selected-li' href='./main'>Acceuil</a>
                </li>
                <li>
                    <a className='selected-li' href='./account'>Mon compte</a>
                </li>
                
                
            </ul>}
        </header>
        
    )
}

export default Header;

