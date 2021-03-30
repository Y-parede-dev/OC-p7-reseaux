const DeleteComment = ()=>{
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupComment = sessionStorage.getItem('comment-modif');
    const recupCommentParse = JSON.parse(recupComment);
    
    const requete = {
        id:recupCommentParse.id_post
    }
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + userStorageJson.token);
    myHeaders.append('Content-Type', 'application/json');
    const myInit = { 
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(requete)
    };
    fetch("http://localhost:3001/api/comment/" + recupCommentParse.id_comment, myInit)
    .then(res=>res.json())

    .catch(err=>console.log(err))
    sessionStorage.removeItem('comment-modif')
}

export default DeleteComment;