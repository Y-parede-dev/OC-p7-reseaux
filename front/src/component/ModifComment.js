import { useState } from 'react';
import '../styles/ModifComment.css';
const ModifComment = () => {
    const [contentComment, setContentComment] = useState('');

    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    const recupComment = sessionStorage.getItem('comment-modif');
    const recupCommentParse = JSON.parse(recupComment);
    

    const handleSubmit = (event) => {
        event.preventDefault();
       
        const requete = {
            user_id : "",
            comment_id : recupCommentParse.comment_id,
            content:recupCommentParse.content
        }

        requete.user_id = PrecupUserCo.id;
               
        if(contentComment != recupCommentParse.content) {
            requete.content  = contentComment;
        }
        
        const myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + userStorageJson.token);
            myHeaders.append('Content-type', 'application/json');
            const myInit = { 
                method: 'PUT',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(requete)
            };
        fetch("http://localhost:3001/api/comment/"+recupCommentParse.comment_id, myInit)
        .then(res=>res.json())
        
        .catch(err=>console.log(err))
        sessionStorage.removeItem('comment-modif')
        window.location.href = '#post-full';
    }
    const handleChangeContent = (event) =>{
        setContentComment(event.target.value);
       
    }

    return(
        <section className="modif-comment">
            <form id="form-modif-comment" onSubmit={handleSubmit}> 
                <label htmlFor="content-modif-comment"></label>
                <textarea className="form-control" type="text" name="content-modif-comment" value={contentComment} onChange={handleChangeContent}/>
                
                <button onClick={()=>window.location.href='./main'}className="form-control form-control-modif-comment-annuler" name="annuler" type="button">annulez</button>
                <button className="form-control form-control-modif-comment" name="submit" type="submit">envoyer</button>
                

            </form>
        </section>
    )
};
export default ModifComment;