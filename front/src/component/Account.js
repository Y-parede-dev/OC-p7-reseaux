import {useEffect, useState} from 'react';
import {createHeader} from '../assets/js/Function';
import ModifAccount from './ModifAccount';

function Account({isConected, setIsConected}){
    const [user, setUser] = useState([]);

    const handleSubmit = (path) =>{
        window.location.href= `${path}`;
    }
    const userStorage = sessionStorage.getItem("token+id")
    const userStorageJson = JSON.parse(userStorage);
    useEffect(() => {
        console.log(isConected)
       
        const userStorageId = userStorageJson.user_id;
        
        //const myHeaders = new Headers();
        const url = "http://localhost:3001/api/auth/account/"+userStorageId;
        
        //console.log('type of id req',typeof requete.id)
        const myInit = { method: 'GET',
                        headers: createHeader(),
                        mode: 'cors',
                        cache: 'default',
                        
                    };
                    
        fetch(url, myInit)
            .then(res => res.json())
            .then(
            (result) => {
                
                setUser(result.result);
                console.log( user)

            },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
            (error) => {
                console.log("error")
            }
            )
        },[])
    return(
        <div>{ isConected &&
            <div>{user.map(item=>(
                    
                <div key={Date.now()}>
                    <h2 className='profil'>PROFIL  {sessionStorage.setItem('userIsCo', JSON.stringify(user))}</h2>
                    <p className='profil-info'>nom : {item.nom}</p>
                    <p className='profil-info'>prenom : {item.prenom}</p>
                    <p className='profil-info'>adresse email : {item.adresse_email}</p>
                    <p className='profil-info profil-info-password'>mot de passe : {userStorageJson.password}</p>
                    <img src={item.image_url} alt='Avatar utilisateur'/>
                </div>))}
                <div key={Date.now() + Date.now()}>
                    <button onClick={()=>handleSubmit('modify')}> modifier</button>
                    <button onClick={()=>handleSubmit('del')}> suprimer le compte</button>
                </div>
            </div>
            }
        </div>
    )
}

export default Account;