import {useEffect, useState} from 'react';
import '../styles/Comment.css';
import CreateComment from './CreateComment';
import DeleteComment from './DeleteComment';
import ModifComment from './ModifComment';



export default function Comment(postId) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentOnModif, setCommentOnModif]= useState('');

    const userCoId = postId.userCoId;
    console.log(userCoId)


    //recup du post id 
    const postI = postId.postId;
    // on le stringify 
    const postIdRecup = JSON.stringify(postI);
    //puis on le transforme en number
    const postIdToNumber = parseInt(postIdRecup, 10);
    const urlComm = "http://localhost:3001/api/comment/"

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
                setIsLoaded(true);
                setComments(result.result);
            },
          
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
        },[]);
        const btnToglC = (item, idC)=> {
            console.log(comments)
            
            sessionStorage.setItem('comment-modif', JSON.stringify(item))
            let idComment = `myDropdown-${idC}`
            document.getElementById(idComment).classList.toggle("show");
            document.getElementById(idComment).classList.toggle("comment");
            
          }
        const displayModifComment =(itemP)=>{
            const item = itemP;
            setCommentOnModif(item)
        
          }
        
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
     return <div>Chargement...</div>;
    } else {
        
        return (
            <div className="comment" id={`comment-${postIdToNumber}`}>
                <CreateComment postId={postI}/>
                <ul className='comment-ul'>
                   {comments.map(item=>(
                            
                        postIdToNumber == item.post_id_comment && 
                        <li className='comment-content' key={Date.now()+ item.post_id_comment+item.comment_id }>
                            <img alt="avatar user comment" className="avatar-comment" src={urlComm.split('api')[0]+'images/avatars/'+item.avatar_user} />
                            <div className='comment-user-content'>
                                <p className="comment-user">{`${item.comment_user} ${item.comment_user_prenom}` }</p>
                            </div>
                            <div className='content-comment-or-modif'>{item.comment_id != commentOnModif.comment_id?
                                <div className='content-comment'>
                                    <div className='comment-text-content'>
                                      <p className='comment-text'>{item.comment_content}</p>
                                    </div>
                                    <div className='parametre-post parametre-comment'>
                                        <button aria-label='settings' className="dropbtn dropbtn-comment" onClick={()=>btnToglC(item, item.comment_id)}><i className="fas fa-ellipsis-h"></i></button>
                                    </div>
                                    <div className="parametre-comment-open">
                                        <div className="dropdown bkcol">
                                            {userCoId == item.comment_user_id ?
                                            
                                            <div className="dropdown-content" id={`myDropdown-${item.comment_id}`}>
                                                <input type='button' className='btn-more-params-post' onClick={()=>displayModifComment(item)} href="../modify-post" value="modifier" />
                                                <input type="button" className='btn-more-params-post btn-more-params-post-del' onClick={()=>DeleteComment()} value='suprimer' />
                                            </div> :
                                            <div className="dropdown-content" id={`myDropdown-${item.comment_id}`}>
                                                <a className='btn-more-params-post' href="#">signaler</a>
                                            </div>
                                                }
                                        </div>
                                    </div>
                                </div>:<ModifComment />}
                            </div>
                        </li>
                        ))
                    }
                </ul>
       
            </div>
        )
    };
};