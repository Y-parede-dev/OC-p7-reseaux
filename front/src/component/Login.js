import { useEffect, useState } from "react";
import {createHeader} from "../assets/js/Function";

function Login({isConected, setIsConected}){
 
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  
  

  const handleChangeEmail = (event) => {
    setEmailData(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPasswordData(event.target.value);
  };
  const handleSubmit = (event) => {
      event.preventDefault()
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
   const usersEmails = [];
   function findUser(){
    fetch('http://localhost:3001/api/auth/account')
      .then(res=>res.json())
      .then((result)=>{
        const allUsers = result.result;
        allUsers.map((item)=>{
          usersBDD.push(item);

          return usersBDD;
        })
        usersBDD.map((itemUser)=>{
         
          usersEmails.push(itemUser);
          return usersEmails
        })

      })
      console.log(usersEmails[0]);
      

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
            <input name="email-login" type="email" placeholder="*email" value={emailData} onChange={handleChangeEmail}/>

            <label htmlFor="password-login"></label>
            <input name="password-login" type="password" placeholder="*mot de passe" value={passwordData} onChange={handleChangePassword}/>
            <input name="submit-login" type="submit" value="envoyer"/>

        </form> : window.location.href ="./main"
        }
      </div>
    )

};

export default Login;