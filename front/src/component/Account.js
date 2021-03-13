import {useEffect, useState} from 'react';
import createHeader from '../assets/Function';
function Account({isConected, setIsConected}){
    const [user, setUser] = useState([]);
    useEffect(() => {
        console.log(isConected)
        const userStorage = localStorage.getItem("token+id")
        const userStorageJson = JSON.parse(userStorage);
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
                console.log( result.result)

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
                    <h2>PROFIL</h2>
                    <p>nom : {item.nom}</p>
                    <p>prenom : {item.prenom}</p>
                    <p>adresse email : {item.adresse_email}</p>
                    <p>mot de passe : {item.mot_de_passe}</p>
                    <img src={item.image_url} alt='Avatar utilisateur'/>
                </div>))}
                <div><button > modifier</button></div>
            </div>
            }
        </div>
    )
}

export default Account;