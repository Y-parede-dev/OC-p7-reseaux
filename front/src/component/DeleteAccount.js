import {createHeader} from '../assets/js/Function';
const DeleteAccount = () => {
   
    const userStorage = sessionStorage.getItem("token+id")
    const userStorageJson = JSON.parse(userStorage);
    const userStorageId = userStorageJson.user_id;

    const url = "http://localhost:3001/api/auth/account/"+ userStorageId;
    const requete = {
        id: JSON.stringify(userStorageId),
        token: userStorageJson.token
     }
     console.log(typeof requete.user_id, ' - ', typeof url)
    const delInit = {
        method: 'DELETE',
        headers: createHeader(),
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(requete)
    }
    function delUser(){
        fetch(url, delInit)
            .then(res => res.json())
            .then(
                (result)=>{
                    console.log(result)
                }
            )
    }
    delUser()
    return(
        <div>
            <p>Ok! bye</p>
             {setTimeout(() => {
                 document.location.href='../';
                 sessionStorage.clear();
                 
             }, 2000)}
        </div>
    )
}
export default DeleteAccount;