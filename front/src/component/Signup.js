import '../styles/Signup.css';
import {useEffect, useState} from 'react';
import {createHeader, isValidEmailFront, isValidPasswordFront} from '../assets/js/Function';

function Signup(){

  const [nameData, setNameData] = useState('');
  const [prenomData, setPrenomData] = useState('');
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  
  const messagErreur = document.createElement('P');


  let userIsValid = false ;
  let testValue = false;

  let userExist = false;
  if (nameData!=='' && prenomData !=="" && emailData !== "" && passwordData !==""){
    testValue = true;
    
  }

  const verifyInfoUsers = () => {
    const verifUser = sessionStorage.getItem('usersOnBdd');
    const verifUserJson = JSON.parse(verifUser)
    console.log("verifUserJson",verifUserJson)
    verifUserJson.forEach(item=>{
      console.log('item : ', item)
      if(emailData === item){
        userExist = true;
        return userExist;
     };
    });
    if(userExist){
      if(document.getElementById('form-signup').childElementCount<11){  
        messagErreur.className = 'message-erreur';
        messagErreur.textContent = 'Adresse email déjà dans la base de donnée';
        document.getElementById('form-signup').appendChild(messagErreur);
        console.log(document.getElementById('form-signup').childElementCount);
      };
    }else{
      if(isValidEmailFront(emailData)){
        if(isValidPasswordFront(passwordData)){
          if (nameData!==""&& prenomData !== ""){
            userIsValid = true;
          };
        } else{
          messagErreur.className = 'message-erreur';
          messagErreur.textContent ='Mot de passe trop faible veuillez entrez un mot de passe fort ( une Majuscule, une miniscule, min 8 lettres max 15 lettres, Au moins un charactere spécial ex (% µ ; § / ? ... etc))';
          document.getElementById('form-signup').appendChild(messagErreur);  
        };
      }else{
        messagErreur.className = 'message-erreur';
        messagErreur.textContent ='Adresse email non fonctionnel veuillez entrez une adresse correct';
        document.getElementById('form-signup').appendChild(messagErreur);
      };
    };
  };

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
  const handleSubmit = (event) => {
    event.preventDefault();
    verifyInfoUsers();
    if(userIsValid){
      saveUser();
      window.location.href= '../login';
    }
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
console.log(requete);

useEffect(()=>{
  const usersBDD = [];
  function findUser(){
    fetch('http://localhost:3001/api/auth/account')
      .then(res=>res.json())
      .then((result)=>{
        const allUsers = result.result;
        allUsers.forEach((item)=>{
          usersBDD.push(item.adresse_email);
          return usersBDD;
        })
        sessionStorage.setItem('usersOnBdd', JSON.stringify(usersBDD))
      })
  };  
  findUser();
 }, [])
const saveUser=()=>{
  fetch("http://localhost:3001/api/auth/signup", myInit)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        },
       
        (error) => {
          console.log(error)
        }
      )
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
        {testValue && <button id="submit-signup"  className="input-form submit" name='submit' type='submit' >envoyer</button>
          }
      </form>
      
    </div>
  )
};
export default Signup;