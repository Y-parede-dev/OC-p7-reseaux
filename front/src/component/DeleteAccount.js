const DeleteAccount = () => {
    let isDelete = false;
    if(window.confirm('Etes vous sur de vouloir suprimer votre compte? ')){
        const userStorage = sessionStorage.getItem("token+id");
        const userStorageJson = JSON.parse(userStorage);
        const userStorageId = userStorageJson.user_id;
        const url = "http://localhost:3001/api/auth/account/"+ userStorageId;
        const requete = {
            id: JSON.stringify(userStorageId),
            token: userStorageJson.token
        };
        const headerWithToken = new Headers();
        headerWithToken.append('Content-type','application/json');
        headerWithToken.append('Authorization', 'Bearer ' + userStorageJson.token);
        console.log(typeof requete.user_id, ' - ', typeof url);
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
                .then(
                    (result)=>{
                        console.log(result)
                    }
                )
        };
        delUser();
        isDelete = true;
    }

    
    return(
        <div>{ isDelete?
            <div>
                <p>Ok! bye</p>
                {setTimeout(() => {
                    document.location.href='../';
                    sessionStorage.clear();
                    
                }, 2000)}
            </div>: <div>{window.location.href='./main'}</div>
            }
        </div>
    )
};
export default DeleteAccount;