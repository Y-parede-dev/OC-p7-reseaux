import { useState } from "react";
import { createHeader, VerifState } from "../assets/js/Function";
import '../styles/CreateComment.css';
function CreateComment( {postId, commentUpp, setCommentUpp}){

    const [contentComment, setContentComment] = useState('');
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    const handleSubmit = (event) => {
        
        event.preventDefault();
        const requete = {
            user_id: "",
            content: contentComment,
            post_id:postId
        }
        
        requete.user_id = PrecupUserCo.id;
        
        const headerWithToken = new Headers();
        headerWithToken.append('Content-type','application/json');
        headerWithToken.append('Authorization', 'Bearer ' + userStorageJson.token);
        
        const myInit = { 
            method: 'POST',
            headers: headerWithToken,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(requete)
        };
        VerifState(commentUpp, setCommentUpp)
        
        setContentComment('')
        fetch("http://localhost:3001/api/comment", myInit)
        .then(res=>res.json())
        
        .catch(err=>console.log(err))
        

    }
    const handleChangeContent = (event) =>{
        setContentComment(event.target.value);
    }
  
    return(
        
        <form onSubmit={handleSubmit} id="form-create-comment">
            <label htmlFor="content-new-comment"></label>
            <textarea className="form-control-comment" type="text" name="content-new-comment" value={contentComment} onChange={handleChangeContent}/>
            <button className="form-control-comment form-control-comment-submit" name="submit-login" type="submit">envoyer</button>

        </form>
    )
};
export default CreateComment;