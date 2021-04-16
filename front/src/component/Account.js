import {useEffect, useState} from 'react';
import {createHeader} from '../assets/js/Function';

import '../styles/Account.css'
import ModifAccount from './ModifAccount';
import DeleteAccount from './DeleteAccount';
import RecipeReviewCard from './Card';


const url = "http://localhost:3001/api/auth/account/";

function Account({isConected}){
    
        
    const [user, setUser] = useState([]);
    const [userModif, setUserModif] = useState(false);


    const handleSubmit = () =>{
        setUserModif(true)
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
        console.log(user)
    return(
        <div>
            <section className='section-profil'>{ isConected &&
                <div className="content-full-profil">{user.map(item=>(
                        !userModif?
                    <div className='content-profil' key={Date.now()}>
                        <h2 className='profil'>PROFIL </h2>
                        <p className='profil-info'><span className='profil-info-static'>nom :</span> <span className='profil-info-dynamique'>{item.nom}</span></p>
                        <p className='profil-info'><span className='profil-info-static'>prenom :</span> <span className='profil-info-dynamique'>{item.prenom}</span></p>
                        <p className='profil-info'><span className='profil-info-static'>adresse email :</span> <span className='profil-info-dynamique'>{item.adresse_email}</span></p>
                        <img className="avatar-profil" src={url.split('api')[0]+"images/avatars/"+item.image_url} alt='Avatar utilisateur'/>

                        <div className='content-button-profil' key={Date.now() + Date.now()}>
                            <button alt='modifier le compte' className='button-account' onClick={()=>handleSubmit()}>🛠<span className='no-mobile'> modifier</span></button>
                            <button alt="suprimez le compte" className='button-account button-account-del' onClick={()=>DeleteAccount()}>⛔<span className='no-mobile'> suprimer le compte</span></button>
                        </div>
                    </div>
                    : <div className='content-profil-modif' key={Date.now()}>
                        <img className="avatar-profil avatar-profil-modif" src={url.split('api')[0]+"images/avatars/"+item.image_url} alt='Avatar utilisateur'/>

                        <ModifAccount userModif={userModif} 
                        
                        />
                    </div>
                    ))}
                    
                </div>
                }
            </section>
            
        </div>
    )
}

export default Account;