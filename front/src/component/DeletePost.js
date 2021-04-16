const DeletePost = ({setPostM, postM})=>{
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupPost = sessionStorage.getItem('post-modif');
    const recupPostParse = JSON.parse(recupPost);
    console.log(recupPostParse)
    const requete = {
        user_id:recupPostParse.user_id,
        post_id:recupPostParse.id_post
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
    fetch("http://localhost:3001/api/post/" + recupPostParse.id_post, myInit)
        .then(res=>res.json())

        .catch(err=>console.log(err))
    
    sessionStorage.removeItem('post-modif')
    if(postM ==true){
        setPostM(false)
    }else {
        setPostM(true)

    }
}

export default DeletePost;