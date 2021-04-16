import React,{ useEffect, useState } from 'react';

import Loader from '../assets/js/Loader';
import Comment from './Comment';


import '../styles/Card.css';
import ModifPost from './ModifPost';
import DeletePost from './DeletePost';
import Likes from './Likes';
import Signaler from './Signaler';
import { GetPost } from './Api';


const url="http://localhost:3001/api/post/";

export default function RecipeReviewCard({postM, setPostM, url}) {
  const [onModif, setOnModif] = useState(false);
  const [postOnModif, setPostOnModif]= useState('');
  const [userCoId, setUserCoId] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  const userIdToken = sessionStorage.getItem('token+id');
  const pUserIdToken = JSON.parse(userIdToken);
  const userIsAdmin = sessionStorage.getItem('userIsCo');
  const userIsAdminP = JSON.parse(userIsAdmin);

  const btnTogl = (item, name, idP)=> {
    sessionStorage.setItem('post-modif', JSON.stringify(item));
    let idPost = name + '-' + idP
    document.getElementById(idPost).classList.toggle("show");

    
  }
  const btnToglSignaler = (item, name, idP) => {
    
    sessionStorage.setItem('post-modif', JSON.stringify(item))
    let idPost = name + '-' + idP
    document.getElementById(idPost).classList.toggle("show-signaler");
    document.querySelector('body').classList.toggle(".body");
  }
  const btnToglComment = (idP)=> {
    let idPost = `comment-${idP}`
    document.getElementById(idPost).classList.toggle("show");
    
  }

  const displayModifPost =(itemP)=>{
    sessionStorage.setItem('post-modif', JSON.stringify(itemP))

    const item = itemP;
    setPostOnModif(item)
    if(onModif){
      setOnModif(false)
    }else{
      setOnModif(true)
    }
  }
  console.log(items)

  useEffect(() => {
    setUserCoId(pUserIdToken.user_id);
    setTimeout(()=>{
      GetPost(url, setIsLoaded, setItems)

    },300)
    console.log(items)
  }, [postM]);
  

  if (error) {
    return <div>Erreur : {error.message}</div>;
  
  } else {
    return (
      <div className="side-post"> {
        
        <div id="post-full" className='cards'>{items.map(item => ( 
          
          <div id={`post-${item.id_post}`} key={Date.now()+((item.id_post+item.user_id)*2)} className='card-content'>{!isLoaded?<Loader />
          
          :<div className='card-content-or-load'>
            <div className='header-post'>
              <img alt="Avatar Utilisateur" src={url.split("api")[0]+"images/avatars/"+item.avatar} className='avatar-on-post'/>
              <div className="post-name-date">
                <p className="post-name">{item.nom_post +' '+ item.prenom_post}</p>
                <p className="post-date">{item.date_post}</p>
              </div>
              <div className='parametre-post'>
                <button aria-label='settings' className="dropbtn" onClick={()=>btnTogl(item, "myDropdown", item.id_post)}><i className="fas fa-ellipsis-h"></i></button>
              </div>
              <div className="parametre-post-open">
                  <div className="dropdown bkcol">
                    {userCoId == item.user_id || userIsAdminP.isAdmin == true ?
                    <div className="dropdown-content" id={`myDropdown-${item.id_post}`}>
                      <input type='button' className='btn-more-params-post' onClick={()=>displayModifPost(item)}  value="modifier" />
                      <input type="button" className='btn-more-params-post btn-more-params-post-del' onClick={()=>DeletePost({postM, setPostM})} value='suprimer' />
                    </div> :
                    <div>
                      <div className="dropdown-content" id={`myDropdown-${item.id_post}`}>
                        <input type='button' className='btn-more-params-post' onClick={()=>{btnToglSignaler(item, "signaler", item.id_post)}} value="signaler" />
                      </div>
                      <div>
                        
                      </div>
                    </div>
                    }
                  </div>
                </div>
            </div>
            <div className="content-or-modif">{item.id_post != postOnModif.id_post?
              <div className='content-post'>
                <Signaler className="comment" postId={item.id_post} id={`signaler-${item.id_post}`} />
                {item.content_post!=''&&
                
                <p className="text-post">{item.content_post}</p>}
                
                <div className="media_post">
                {item.url_web!= null && item.url_web!= "null" 
                ?
                <iframe 
                  alt='video poster par utilisateur'
                  className="iframe-media"
                  width="100%"
                  height="400px"
                  src={item.url_web!='undefined' ?item.url_web.split('watch?v=').join('embed/'):''}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen="allowfullscreen"
                >
                </iframe>
                :<div className="media-post">{item.image_post!= null && item.image_post!= "null" 
                  &&<img width='100%' height="auto" className="iframe-media" alt='file post' src={item.image_post!='undefined' ?url.split('api')[0]+"images/posts/" + item.image_post:'' }/>
                 
                    }
                  </div>
                  }
                </div>

                      
              </div>:<ModifPost postM={postM} setPostM={setPostM}/>
              }
              </div>
              <div className='header-comment'>
                  <Likes url={url} id_post={item.id_post} btnToglComment={btnToglComment} />
              </div>
              <div className='comment-before'>
                <Comment  id={`comment-${item.id_post}`} postId={item.id_post} userCoId ={userCoId} btnToglSignaler={btnToglSignaler} />
              </div>
            
          </div>
        }</div>
          
        ))}
      </div>
    }
    </div>
    );
  };
};
