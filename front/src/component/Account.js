import {useEffect, useState} from 'react';
function Account(){
    const [user, setUser] = useState([]);
    useEffect(() => {
        
        const userStorage = localStorage.getItem("token+id")
        const userStorageJson = JSON.parse(userStorage);
        const userStorageId = userStorageJson.user_id;
        
        console.log(userStorageId)
        const myHeaders = new Headers();
        const url = "http://localhost:3001/api/auth/account/:"+userStorageId;
        console.log(url)
        const requete = {
            user_id :userStorageId
        }
        const myInit = { method: 'GET',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: JSON.stringify(requete)
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
        <div>
        <div>
            <h2>PROFIL</h2>
            <p>nom : </p>
            <p>prenom : </p>
            <p>adresse email : </p>
            <p>mot de passe : </p>
            <img src="#" alt='Avatar utilisateur'/>
        </div>
        <div><button > modifier</button></div>
    </div>
    )
}

export default Account;