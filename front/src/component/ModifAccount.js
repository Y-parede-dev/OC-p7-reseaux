import { useEffect, useState } from "react";
import '../styles/ModifAccount.css';
import {createHeader, isValidEmailFront, isValidPasswordFront} from '../assets/js/Function';


const ModifAccount = () =>{
    
    const [nameData, setNameData] = useState('')
    const [prenomData, setPrenomData] = useState('')
    const [emailData, setEmailData] = useState('')
    const [passwordData, setPasswordData] = useState('')


    const handleChangeName = (event) => {
        setNameData(event.target.value);
    }
    const handleChangePrenom = (event) => {
        setPrenomData(event.target.value);
    }
    const handleChangeEmail = (event) => {
        setEmailData(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPasswordData(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        //document.location.href='/account';
        modifUser();
    }
    const userStorage = sessionStorage.getItem("token+id")
    const userStorageJson = JSON.parse(userStorage);
    const userStorageId = userStorageJson.user_id;
    const requete = {
        nom: nameData,
        prenom:prenomData,
        adresse_email :emailData,
        mot_de_passe: passwordData,
     }
    
    const userIsCo = sessionStorage.getItem('userIsCo')
    const userIsCoParse = JSON.parse(userIsCo)
    userIsCoParse.forEach(element => {
        sessionStorage.setItem('UIC', JSON.stringify(element))
    });
    const UIC = sessionStorage.getItem('UIC')
    const UICParse = JSON.parse(UIC);
    console.log(UICParse.nom)

    const putInit = {
        method: 'PUT',
        headers: createHeader(),
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(requete)
    }
    const url = "http://localhost:3001/api/auth/account/"+ userStorageId;
    function modifUser() {
        fetch(url, putInit)
        .then(res=>res.json())
        .then(
            (result)=>{
                console.log(result)
            },
       
            (error) => {
              console.log(error)
            }
          )
    }
    return(
        <div key= {Date.now() *3}>{userIsCoParse.map(item=>(
            <form  key={Date.now()} onSubmit={ handleSubmit} id='form-modif'>
                <label htmlFor="nom-modif"></label>
                <input name='nom-modif' type="text" placeholder= {nameData} value={UICParse.nom} onChange={handleChangeName}/>
                <label htmlFor="prenom-modif"></label>
                <input name='prenom-modif' type="text" placeholder='*Prenom' value={prenomData} onChange={handleChangePrenom}/>
                <label htmlFor="email-modif"></label>
                <input type="email" placeholder='*Email' value={emailData} onChange={handleChangeEmail}/>
                <label name='mot-de-passe-modif'></label>
                <input htmlFor="avatar-modif" type="password" placeholder='*Mot de passe FORT' value={passwordData} onChange={handleChangePassword}/>
                <label name='avatar-modif'>Avatar</label>
                <input type= "file" />
                <button type='submit'>Validé la modification</button>
            </form>
            )
       )
    }
       </div>
  ) 
} 
export default ModifAccount;
/*div key={Date.now()}>
                    <h2>PROFIL</h2>
                    <p>nom : {item.nom}</p>
                    <p>prenom : {item.prenom}</p>
                    <p>adresse email : {item.adresse_email}</p>
                    <p>mot de passe : {item.mot_de_passe}</p>
                    <img src={item.image_url} alt='Avatar utilisateur'/>
                </div>))}
                <div><button onModif={onModif} setOnModif={setOnModif} onClick={ModifAccount}> modifier</button></div> */