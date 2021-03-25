import logo from '../logo.svg';
import '../styles/Header.css';

const disconnect = () =>{
    //localStorage.clear()
    //sessionStorage.removeItem('isCo');
    //sessionStorage.removeItem('token+id');
    sessionStorage.clear()

};
window.onscroll = ()=>{fixOnScroll()};
let srll = false;
sessionStorage.setItem('scroll', srll)
console.log(window.location.href.split('/')[3])
if(window.location.href.split('/')[3] == 'account'){
    if(document.getElementById('Account')){
     document.getElementById('Account').focus()

    }
}
const fixOnScroll =()=>{
    let elt = document.getElementById('sign-log');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
        elt.className = 'ul-sign-log scrol-fixed';
        srll = true;
        sessionStorage.setItem('scroll', srll);
    }else {
        elt.className = 'ul-sign-log';
        srll = false;
        sessionStorage.setItem('scroll', srll);
        
        //elt.classList.remove('scrol-fixed');
    }
}

function Header({isConected, setIsConected}){
    const titleHeader = "groupomania";
    
    return (
        <header className="App-header">
            <div className="header">
                <h1 className='header-title '>{titleHeader}</h1>
                <img src={logo} className="App-logo" alt="logo Groupomania" />
            </div>
            {!isConected? <ul onScroll={fixOnScroll} id='sign-log' className="ul-sign-log">
                
                
                <li>
                    <a className='selected-li' href='./signup'>nouveau compte</a>
                </li>
                <li>
                    <a className='selected-li' id='login-link' href='./login' >se connecter</a>
                </li>
                
            </ul>: <ul onScroll={fixOnScroll} id='sign-log' className=" ul-sign-log">
                
                <li>
                    <a className='selected-li' id="Acceuil" href='./main'>
                        <i className="fas-custom-header-isCo fas-home-custom fas fa-home"></i>
                        <p className='none-on-small'>Acceuil</p></a>
                </li>
                <li>
                    <a className='selected-li' id="Account" href='./account'>
                        <i className="fas-custom-header-isCo fas-adress-card-custom fas fa-address-card"></i>
                        <p className='none-on-small'>Mon compte</p></a>
                </li>
                <li>
                    <a className='selected-li' id='Disconect' onClick={()=>disconnect()} href='./'>
                        <i className="fas-custom-header-isCo fas fa-sign-out-alt"></i>
                        <p className='none-on-small'>Se déconnecter</p></a>
                </li>
                
                
            </ul>}
        </header>
        
    )
};

export default Header;

