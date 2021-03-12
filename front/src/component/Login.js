import { useEffect, useState } from "react";
import createHeader from "../assets/Function";

function Login({isConected, setIsConected}){
 
  const [emailData, setEmailData] = useState('')
  const [passwordData, setPasswordData] = useState('')
  
  

  const handleChangeEmail = (event) => {
    setEmailData(event.target.value);
  }
  const handleChangePassword = (event) => {
    setPasswordData(event.target.value);
  }
  const handleSubmit = (event) => {
      event.preventDefault()
      logUser();

    }
    const connected = (result) => {
      const localLoggin = localStorage.getItem("token+id");
      const localLogginParse = JSON.parse(localLoggin);

      const recupUserId = localLogginParse.user_id;
      const recupUserToken = localLogginParse.token;
      if(result.user_id === recupUserId && result.token === recupUserToken){
        setIsConected(true);
        sessionStorage.setItem('isCo', true)
        console.log('is conected : ', isConected)
      }
      
    }
    const saveLocal = (result) => {
      const resultJson = JSON.stringify(result)
      localStorage.setItem('token+id', resultJson);

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
  console.log(requete)
  
  

  const logUser = () => {
    fetch("http://localhost:3001/api/auth/login", myInit)
        .then(res => res.json())
        .then(
          (result) => {
            saveLocal(result)
            connected(result)
            console.log(isConected)

            //localStorage.clear()
          },
          (error) => {
            console.log(error)
          }
        )
  }
  
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

}

export default Login;