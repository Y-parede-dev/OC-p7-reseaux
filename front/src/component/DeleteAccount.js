const DeleteAccount = () => {
    let isDelete = false;
    
    if(window.confirm('Etes vous sur de vouloir supprimer votre compte? ')){
        const userStorage = sessionStorage.getItem("token+id");
        const userStorageJson = JSON.parse(userStorage);
        const userStorageId = userStorageJson.user_id;
        const url = "http://localhost:3001/api/auth/account/"+ userStorageId;
        const requete = {
            user_id: userStorageId,
            token: userStorageJson.token,
        };
        const headerWithToken = new Headers();
        headerWithToken.append('Content-type','application/json');
        headerWithToken.append('Authorization', 'Bearer ' + userStorageJson.token);
        const delInit = {
            method: 'DELETE',
            headers: headerWithToken,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(requete)
        };
        function delUser(){
            fetch(url, delInit)
                .then(res => res.json(requete.token))
                
        };
        delUser();
        isDelete = true;
    }

    
    return(
        <div>{ isDelete&&
            <div>
                {setTimeout(() => {
                    document.location.href='../';
                    sessionStorage.clear();
                    
                }, 100)}
            </div>            }
        </div>
    )
};
export default DeleteAccount;