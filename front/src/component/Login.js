import { useState } from "react";
import {createHeader} from "../assets/js/Function";
import '../styles/Login.css';

function Login({isConected, setIsConected}){
  
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [messageData, setMessageData] = useState('');

  const handleChangeEmail = (event) => {
    setEmailData(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPasswordData(event.target.value);
  };
  const  handleSubmit = (event) => {
    
    event.preventDefault()
    logUser();
  };
  const connected = (result) => {
    
    if(result.isConected){
      setIsConected(result.isConected);
      sessionStorage.setItem('isCo', true);
    }
  };
  const SaveLocal = (result) => {
    const resultJson = JSON.stringify(result);
    sessionStorage.setItem('token+id', resultJson);
  };
  const requete = {
    adresse_email : emailData,
    mot_de_passe: passwordData
  };
  const myInit = { 
      method: 'POST',
      headers: createHeader(),
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(requete)
  };
  

  const logUser = () => {
    fetch("http://localhost:3001/api/auth/login", myInit)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.user_id)
        setMessageData(result.message)
        SaveLocal(result)
        getUserCo();
        connected(result)
        },
        (error) => {
          console.log(error)
        }
      )
  };
  const getUserCo = ()=>{
    const uIsCo = sessionStorage.getItem('token+id');
    const uIsCoP= JSON.parse(uIsCo);
    fetch('http://localhost:3001/api/auth/account/'+ uIsCoP.user_id)
      .then(res=>res.json())
      .then((resu)=>{
        resu.result.forEach((it)=>{console.log(it);sessionStorage.setItem('userIsCo',JSON.stringify(it))})        
    })
  }
    return(
      <div> { !isConected ?
       <div>
        <form id="form-login" className="form-log-sign" onSubmit={handleSubmit}>
            <label htmlFor="email-login"></label>
            <input className='input-form input-log email-log' name="email-login" type="email" placeholder="*email" value={emailData} onChange={handleChangeEmail}/>

            <label htmlFor="password-login"></label>
            <input className='input-form input-log password-log' name="password-login" type="password" placeholder="*mot de passe" value={passwordData} onChange={handleChangePassword}/>
            <button className='button-form button-log submit-log' name="submit-login" type="submit">envoyer</button>

        </form>
        <p className="message-erreur">{messageData}</p>
        </div>: window.location.href='./main'       
        }
      </div>
    )
};

export default Login;