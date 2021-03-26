import {useEffect, useState} from 'react';
import {createHeader} from '../assets/js/Function';

import '../styles/Account.css'


const url = "http://localhost:3001/api/auth/account/";

function Account({isConected}){
    
        
    const [user, setUser] = useState([]);

    const handleSubmit = (path) =>{
        window.location.href= `${path}`;
    }
    const userStorage = sessionStorage.getItem("token+id")
    const userStorageJson = JSON.parse(userStorage);
    useEffect(() => {
       
        const userStorageId = userStorageJson.user_id;
        
        //const myHeaders = new Headers();
        const urlRequete = url+userStorageId;
        
        const myInit = { method: 'GET',
                        headers: createHeader(),
                        mode: 'cors',
                        cache: 'default',
                        
                    };
                    
        fetch(urlRequete, myInit)
            .then(res => res.json())
            .then(
            (result) => {
                
                setUser(result.result);

            },
           
            (error) => {
                console.log("error : ", error)
            }
            )
            //eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    return(
        <section className='section-profil'>{ isConected &&
            <div>{user.map(item=>(
                    
                <div className='content-profil' key={Date.now()}>
                    <h2 className='profil'>PROFIL </h2>
                    <p className='profil-info'><span className='profil-info-static'>nom :</span> <span className='profil-info-dynamique'>{item.nom}</span></p>
                    <p className='profil-info'><span className='profil-info-static'>prenom :</span> <span className='profil-info-dynamique'>{item.prenom}</span></p>
                    <p className='profil-info'><span className='profil-info-static'>adresse email :</span> <span className='profil-info-dynamique'>{item.adresse_email}</span></p>
                    <img className="avatar-profil" src={url.split('api')[0]+"images/avatars/"+item.image_url} alt='Avatar utilisateur'/>
                </div>))}
                <div key={Date.now() + Date.now()}>
                    <button onClick={()=>handleSubmit('modify')}>🛠 modifier</button>
                    <button onClick={()=>handleSubmit('modify-pass')}>🛠 modifier mot de passe</button>
                    <button onClick={()=>handleSubmit('del')}>⛔ suprimer le compte</button>
                    <p className="link-dev">Pour modifier vôtre adresse email veuillez contactez <a href="mailto:magin.code@gmail.comcd">le développeur du site</a></p>
                </div>
            </div>
            }
        </section>
    )
}

export default Account;