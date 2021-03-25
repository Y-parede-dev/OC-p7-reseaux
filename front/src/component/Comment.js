import {useEffect, useState} from 'react';
import '../styles/Comment.css';
import CreateComment from './CreateComment';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

export default function Comment(postId) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState([]);

    //recup du post id 
    const postI = postId.postId;
    // on le stringify 
    const postIdRecup = JSON.stringify(postI);
    //puis on le transforme en number
    const urlComm = "http://localhost:3001/api/comment/"
    const postIdToNumber = parseInt(postIdRecup, 10);
    console.log(postId.postId,' = ',postIdToNumber)

    useEffect(() => {
        const myHeaders = new Headers();

        const myInit = { method: 'GET',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default' };
        fetch(urlComm, myInit)
            .then(res => res.json())
            .then(
            (result) => {
                console.log( result.result)
                setIsLoaded(true);
                setComments(result.result);
            },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
        },[]);
        comments.forEach(it=>console.log(it))
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
     return <div>Chargement...</div>;
    } else {
        
        return (
            <div className="comment" id={`comment-${postIdToNumber}`}>
                <CreateComment postId={postI}/>
                <ul className='comment-ul'>
                    {   comments.map(item=>(
                            
                            postIdToNumber == item.post_id_comment && 
                        <li className='comment-content' key={Date.now()+ item.post_id_comment+item.comment_id }>
                            <img alt="avatar user comment" className="avatar-comment" src={urlComm.split('api')[0]+'images/'+item.avatar_user}></img>
                            <div className='comment-user-txt'>
                            <span className="comment-user">{`${item.comment_user} ${item.comment_user_prenom} a commenter :` }</span><span className='comment-text'>{item.comment_content}</span>
                            </div>
                        </li>
                        ))
                    }
                </ul>
       
            </div>
        )
    };
};