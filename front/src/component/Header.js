import logo from '../logo.svg';
import '../styles/Header.css';

const disconnect = () =>{
    //localStorage.clear()
    sessionStorage.removeItem('isCo');
    sessionStorage.removeItem('token+id');

};

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
                    <a className='selected-li' href='./signup'>nouveau compte</a>
                </li>
                <li>
                    <a className='selected-li' id='login-link' href='./login' >se connecter</a>
                </li>
                
            </ul>: <ul className="ul-sign-log">
                
                <li>
                    <a className='selected-li' href='./main'><i className="fas-custom-header-isCo fas-home-custom fas fa-home"></i>Acceuil</a>
                </li>
                <li>
                    <a className='selected-li' href='./account'><i className="fas-custom-header-isCo fas-adress-card-custom fas fa-address-card"></i>Mon compte</a>
                </li>
                <li>
                    <a className='selected-li' onClick={()=>disconnect()} href='./'><i className="fas-custom-header-isCo fas fa-sign-out-alt"></i>

Se déconnecter</a>
                </li>
                
                
            </ul>}
        </header>
        
    )
};

export default Header;

