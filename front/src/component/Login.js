import { useState } from "react";
import {createHeader} from "../assets/js/Function";
import '../styles/Login.css';
function Login({isConected, setIsConected}){
  
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const messagErreur = document.createElement('P');

  let userExist = false;
  const verifyEmailUsers = () => {
    const verifUser = sessionStorage.getItem('usersOnBdd');
    const verifUserJson = JSON.parse(verifUser)
    console.log("verifUserJson",verifUserJson)
    verifUserJson.forEach(item=>{
      console.log('item : ', item)
      if(emailData === item){
        userExist = true;
        return userExist;
     }
     
    })
    if(!userExist && document.getElementById('form-login').childElementCount<6){
      messagErreur.className = 'message-erreur';
      messagErreur.textContent = 'Adresse email inconue de la base de donnée';
      document.getElementById('form-login').appendChild(messagErreur);
      console.log(document.getElementById('form-login').childElementCount)
      }
  }

  const handleChangeEmail = (event) => {
    setEmailData(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPasswordData(event.target.value);
  };
  const handleSubmit = (event) => {
      event.preventDefault()
      verifyEmailUsers();
      logUser();

    };
    const connected = (result) => {
      
      if(result.isConected){
        setIsConected(result.isConected);
        sessionStorage.setItem('isCo', true);
        console.log('is conected : ', isConected);
      }else {
        alert('Verifiez votre mot de passe et /ou votre adresse email');
      };
      
    };
    const saveLocal = (result) => {
      const resultJson = JSON.stringify(result);
      sessionStorage.setItem('token+id', resultJson);

    };
  
  const requete = {
     
    adresse_email : emailData,
    mot_de_passe: passwordData
   };
   const usersBDD = [];
   function findUser(){
    fetch('http://localhost:3001/api/auth/account')
      .then(res=>res.json())
      .then((result)=>{
        const allUsers = result.result;
        allUsers.forEach((item)=>{
          console.log('bdd : ', item.adresse_email)
          usersBDD.push(item.adresse_email);
          return usersBDD;
        })
        sessionStorage.setItem('usersOnBdd', JSON.stringify(usersBDD))
      })
     
      

  };
  console.log(usersBDD);
  
  findUser();
  const myInit = { 
      method: 'POST',
      headers: createHeader(),
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(requete)
  };
  console.log(requete);
  
  

  const logUser = () => {
    fetch("http://localhost:3001/api/auth/login", myInit)
        .then(res => res.json())
        .then(
          (result) => {
            saveLocal(result)
            connected(result)
            console.log(isConected)
            console.log(result)
            //localStorage.clear()
          },
          (error) => {
            console.log(error)
          }
        )
  };
  
    return(
      <div> { !isConected ?
        <form id="form-login" className="form-log-sign" onSubmit={handleSubmit}>
            <label htmlFor="email-login"></label>
            <input className='input-form input-log email-log' name="email-login" type="email" placeholder="*email" value={emailData} onChange={handleChangeEmail}/>

            <label htmlFor="password-login"></label>
            <input className='input-form input-log password-log' name="password-login" type="password" placeholder="*mot de passe" value={passwordData} onChange={handleChangePassword}/>
            <input className='input-form input-log submit-log' name="submit-login" type="submit" value="envoyer"/>

        </form> : window.location.href ="./main"
        }
      </div>
    )

};

export default Login;