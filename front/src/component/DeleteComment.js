import { VerifState } from "../assets/js/Function";

const DeleteComment = ({commentUpp, setCommentUpp})=>{
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupComment = sessionStorage.getItem('comment-modif');
    const recupCommentParse = JSON.parse(recupComment);
    console.log(recupCommentParse)
    
    const requete = {
        post_id:recupCommentParse.post_id_comment,
        user_id:recupCommentParse.comment_user_id,
        comment_id: recupCommentParse.comment_id
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
    fetch("http://localhost:3001/api/comment/" + recupCommentParse.comment_id, myInit)
        .then(res=>res.json())

        .catch(err=>console.log(err))
        VerifState(commentUpp, setCommentUpp)
}

export default DeleteComment;