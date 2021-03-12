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
    const postIdRecup = JSON.stringify(postI)
    //puis on le transforme en number
    const postIdToNumber = parseInt(postIdRecup, 10)
    
    useEffect(() => {
        const myHeaders = new Headers();

        const myInit = { method: 'GET',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default' };
        fetch("http://localhost:3001/api/comment/", myInit)
            .then(res => res.json())
            .then(
            (result) => {
                console.log( result)
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
        },[])
        
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
     return <div>Chargement...</div>;
    } else {
        
        return (
            <div>
                <CreateComment/>
                <ul>
                    {   
                        comments.map(item=>(
                            
                            postIdToNumber == item.post_id_comment ?
                            <li className='comment-content' id={`${item.post_id_comment} - ${item.post_id_comment}`} key={Date.now()*getRandomInt(98698898598) + item.post_id_comment }>
                                <img className="avatar-comment" src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'></img>
                                {postIdToNumber == item.post_id_comment && <span className="comment-text">{`${item.nom_comment} ${item.prenom_comment} a commenter : ${item.content_comment}`}</span>}
                            </li>:''
                         ))
                    }
                </ul>
       
            </div>
        )
    }
}