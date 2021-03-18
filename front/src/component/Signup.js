import '../styles/Signup.css';
import {useState} from 'react';
import {createHeader} from '../assets/js/Function';

function Signup(){
  const [items, setItems] = useState([]);

  const [nameData, setNameData] = useState('');
  const [prenomData, setPrenomData] = useState('');
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  
  const [isConected, setIsConected] = useState(false);

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
    saveUser();
    console.log(isConected);
  
    if(requete.nom!==''&&requete.prenom!==''&&requete.adresse_email!==""&&requete.mot_de_passe!==""){
      console.log(isConected);
      return setIsConected(true);
      
    };
  };
  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  
  
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


function saveUser(){
  fetch("http://localhost:3001/api/auth/signup", myInit)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItems(result.result);
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
        <input id="nom-signup" className="nom" name="nom" type='text' placeholder="*nom" value={nameData} onChange={handleChangeName} />
        
        <label name="prenom-label" htmlFor='prenom'></label>
        <input id="prenom-signup" className="prenom" name="prenom" type='text' placeholder="*prenom" value={prenomData} onChange={handleChangePrenom} />

        <label name="email-label" htmlFor='email'></label>
        <input id="email-signup" className="email" name="email" type='text' placeholder="*email" value={emailData} onChange={handleChangeEmail} />

        <label name="password-label" htmlFor="password"></label>
        <input id="password-signup" className="password" name='password' type='password' placeholder="*mot de passe" value={passwordData} onChange={handleChangePassword} />
        
        <label name="submit-label" htmlFor="submit"></label>
        <button id="submit-signup"  className="submit" name='submit' type='submit'>envoyer</button>
          
      </form>
      {!isConected? "":window.location='../main'}
    </div>
  )
};
export default Signup;