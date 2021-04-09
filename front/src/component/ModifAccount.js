import { useState } from "react";
import '../styles/ModifAccount.css';


const ModifAccount = (userModif) =>{
    console.log(userModif.userModif)
    const [nameData, setNameData] = useState('');
    const [prenomData, setPrenomData] = useState('');
    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [imgData, setImgData] = useState([]);
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
        console.log(event.target.files[0])
        
        let imageData = event.target.files[0];
        setImgData(imageData);
        
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        modifUser();
        
        sessionStorage.removeItem('UIC');
        window.location.href='./account';
    };
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const userStorageId = userStorageJson.user_id;
    const requete = new FormData();
    
    requete.append('nom',nameData);
    requete.append('prenom',prenomData);
    requete.append('adresse_email',emailData);
    requete.append('mot_de_passe',passwordData);
    requete.append('media',imgData);
    
    const userIsCo = sessionStorage.getItem('userIsCo');
    const userIsCoParse = JSON.parse(userIsCo);
   
    if(nameData === ""){
        requete.set('nom',userIsCoParse.nom);
    };
    if(prenomData === ""){
        requete.set('prenom',userIsCoParse.prenom);

    };
    if(emailData === ""/*ajouter reGex */){
        requete.set('adresse_email',userIsCoParse.adresse_email);       
    };
    if(passwordData === ""/*ajouter reGex */){
        requete.set('mot_de_passe', userStorageJson.password)
    };
    if(!imgData){
        requete.set('image_url', userIsCoParse.image_url);       
        
    };
    const headerWithToken = new Headers();
    headerWithToken.append('Authorization', 'Bearer ' + userStorageJson.token);
    const putInit = {
        method: 'PUT',
        headers: headerWithToken,
        mode: 'cors',
        cache: 'default',
        body: requete
    };
    const url = "http://localhost:3001/api/auth/account/"+ userStorageId;
    function modifUser() {
        fetch(url, putInit)
        .then(res=>res.json())
        .then(
            (result)=>{
            },
            (error) => {
              console.log(error)
            }
          )
    };
    return(
        <div >
            <form onSubmit={ handleSubmit} id='form-modif' className="form-modif">
                
                <label htmlFor="nom-modif"></label>
                <input className="input-form-modif" name='nom-modif' type="text" placeholder= '*Nom' value={nameData} onChange={handleChangeName}/>
                
                <label htmlFor="prenom-modif"></label>
                <input className="input-form-modif" name='prenom-modif' type="text" placeholder='*Prenom' value={prenomData} onChange={handleChangePrenom}/>

                <label htmlFor="email-modif"></label>
                <input className="input-form-modif" name='email-modif' type="text" placeholder='*@mail' value={emailData} onChange={handleChangeEmail}/>

                <label name='mot-de-passe-modif'></label>
                <input className="input-form-modif" htmlFor="avatar-modif" type="password" placeholder='*Mot de passe FORT' value={passwordData} onChange={handleChangePassword}/>

                <label className="avatar-modif" name='avatar-modif'>Avatar</label>
                <input className="input-file" type= "file" onChange={handleChangeImg} />
                
                <button className="input-form submit-modif" type='submit'>Validé la modification</button>

           </form>
            
       </div>
  )
};
export default ModifAccount;
