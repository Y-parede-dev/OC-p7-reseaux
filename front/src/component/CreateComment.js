import { useState } from "react";
import { createHeader } from "../assets/js/Function";
function CreateComment(postId){
    const [contentComment, setContentComment] = useState('');
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    console.log(postId.postId)
    const handleSubmit = (event) => {
        event.preventDefault();
        const requete = {
            user_id: "",
            content: contentComment,
            post_id:postId.postId
        }
        PrecupUserCo.forEach((item)=>{
            requete.user_id = item.id;
            return requete;
        })
        
        const myInit = { 
            method: 'POST',
            headers: createHeader(),
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(requete)
        };
        fetch("http://localhost:3001/api/comment", myInit)
        .then(res=>res.json())
        
        .catch(err=>console.log(err))
    }
    const handleChangeContent = (event) =>{
        setContentComment(event.target.value);
    }
  
    return(
        
        <form id="form-create-comment">
            <label htmlFor="content-new-comment"></label>
            <textarea className="form-control form-control-comment" type="text" name="content-new-comment" value={contentComment} onChange={handleChangeContent}/>
            <input className="form-control form-control-submit" name="submit-login" type="submit" value="envoyer"/>

        </form>
    )
};
export default CreateComment;