import { useState } from "react";
import '../styles/ModifAccount.css';


const ModifAccount = ({user}) =>{
    console.log(window.location.pathname)
    const [nameData, setNameData] = useState('');
    const [prenomData, setPrenomData] = useState('');
    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [imgData, setImgData] = useState('');

    console.log("je suis user", user)
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
    const handleChangeImg = (event) => {
        setImgData(event.target.value.split('path')[1]);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        modifUser();
        alert('modification éffectuées');
        sessionStorage.removeItem('UIC');
        console.log('img data = ',imgData, " type = ",typeof imgData)
    };
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const userStorageId = userStorageJson.user_id;
    const requete = {
        nom: nameData,
        prenom:prenomData,
        adresse_email :emailData,
        mot_de_passe: passwordData,
        image_url: imgData
     };
    
    const userIsCo = sessionStorage.getItem('userIsCo');
    const userIsCoParse = JSON.parse(userIsCo);
    userIsCoParse.forEach(element => {
        sessionStorage.setItem('UIC', JSON.stringify(element));
    });
    const UIC = sessionStorage.getItem('UIC');
    const UICParse = JSON.parse(UIC);
    console.log(UICParse.nom);
    
    if(requete.nom === ""){
        requete.nom = UICParse.nom;
    };
    if(requete.prenom === ""){
        requete.prenom = UICParse.prenom;
    };
    if(requete.adresse_email === ""){
        requete.adresse_email = UICParse.adresse_email;
    };
    if(requete.mot_de_passe === ""){
        requete.mot_de_passe = userStorageJson.password;
    };
    if(requete.image_url === "" ){
        requete.image_url = UICParse.image_url;
    };
    const headerWithToken = new Headers();
     headerWithToken.append('Content-type','application/json');
     headerWithToken.append('Authorization', 'Bearer ' + userStorageJson.token);
    const putInit = {
        method: 'PUT',
        headers: headerWithToken,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(requete)
    };
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
    };
    return(
        <div >{ window.location.pathname === '/modify-pass'?
            <form onSubmit={ handleSubmit} id='form-modif'>
               
                
                <label name='mot-de-passe-modif'></label>
                <input className="input-form" htmlFor="avatar-modif" type="password" placeholder='*Mot de passe FORT' value={passwordData} onChange={handleChangePassword}/>
                
                <button type='submit'>Validé la modification</button>

            </form> : <form onSubmit={ handleSubmit} id='form-modif'>
               
               <label htmlFor="nom-modif"></label>
               <input className="input-form" name='nom-modif' type="text" placeholder= '*Nom' value={nameData} onChange={handleChangeName}/>
               
               <label htmlFor="prenom-modif"></label>
               <input className="input-form" name='prenom-modif' type="text" placeholder='*Prenom' value={prenomData} onChange={handleChangePrenom}/>

               <label htmlFor="email-modif"></label>
               <input className="input-form" name='email-modif' type="text" placeholder='*Email' value={emailData} onChange={handleChangeEmail}/>
              
               <label name='avatar-modif'>Avatar</label>
               <input className="input-file " type= "file" onChange={handleChangeImg} accept="image/png, image/jpeg, image/gif"/>
               
               <button className="input-form submit-modif" type='submit'>Validé la modification</button>

           </form>
            }
       </div>
  )
};
export default ModifAccount;
/*<div key= {Date.now() *3}>
      <form key={Date.now()} onSubmit={handleSubmit} id="form-modif"">
        <label htmlFor='nom-modif'></label>
        <input id="nom-modif" className="nom-modif" name="nom-modif" type='text' placeholder="*nom" value={nameData} onChange={handleChangeName} />
        
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
    </div> */