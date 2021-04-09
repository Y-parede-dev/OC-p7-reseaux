import '../styles/Signup.css';
import {useEffect, useState} from 'react';
import {createHeader, isValidEmailFront, isValidPasswordFront} from '../assets/js/Function';

function Signup(){
  sessionStorage.clear()
  const [nameData, setNameData] = useState('');
  const [prenomData, setPrenomData] = useState('');
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [messageValid, setMessageValid] = useState('');
  

  let userIsComplete = false ;

 
  const handleChangeName = (event) => {
    setNameData(event.target.value);
  };
  const handleChangePrenom = (event) => {
    setPrenomData(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmailData(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPasswordData(event.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    saveUser();
    window.location.href='../'
  };
  
const requete = {
    nom: nameData,
    prenom:prenomData,
    adresse_email :emailData,
    mot_de_passe: passwordData,
 };
const myInit = { 
    method: 'POST',
    headers: createHeader(),
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(requete)
};


const saveUser=()=>{
  fetch("http://localhost:3001/api/auth/signup", myInit)
      .then(res => res.json())
      .then(result=>{
        console.log(result.status);
        setMessageValid(result.message);
      })
      
};

if (nameData !== "" && prenomData !== "" && isValidPasswordFront(passwordData) && isValidEmailFront(emailData)){
  userIsComplete = true;
};



  return(
    <div>
      <form onSubmit={handleSubmit} id="form-signup" className="form-log-sign">
        <label name="nom-label" htmlFor='nom'></label>
        <input id="nom-signup" className="input-form nom" name="nom" type='text' placeholder="*nom" value={nameData} onChange={handleChangeName} />
        
        <label name="prenom-label" htmlFor='prenom'></label>
        <input id="prenom-signup" className="input-form prenom" name="prenom" type='text' placeholder="*prenom" value={prenomData} onChange={handleChangePrenom} />

        <label name="email-label" htmlFor='email'></label>
        <input id="email-signup" className="input-form email" name="email" type='text' placeholder="*email" value={emailData} onChange={handleChangeEmail} />

        <label name="password-label" htmlFor="password"></label>
        <input id="password-signup" className="input-form password" name='password' type='password' placeholder="*mot de passe" value={passwordData} onChange={handleChangePassword} />
        
        <label name="submit-label" htmlFor="submit"></label>
       
        {userIsComplete && <button id="submit-signup"  className="button-form button-log submit-log" name='submit' type='submit' >envoyer</button>
          }
      </form>
      <p className="message-erreur">{messageValid}</p>
    </div>
  )
};
export default Signup;