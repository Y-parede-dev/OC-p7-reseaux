import React,{ useEffect, useState } from 'react';

import Comment from './Comment';

import '../styles/Card.css';
import ModifPost from './ModifPost';
import DeletePost from './DeletePost';


const url="http://localhost:3001/api/post/";

export default function RecipeReviewCard() {
  const [onModif, setOnModif] = useState(false);
  const [postOnModif, setPostOnModif]= useState('');
  const [userCoId, setUserCoId] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const userIdToken = sessionStorage.getItem('token+id');
  const pUserIdToken = JSON.parse(userIdToken);

  const btnTogl = (item, idP)=> {
    sessionStorage.setItem('post-modif', JSON.stringify(item))
    let idPost = `myDropdown-${idP}`
    document.getElementById(idPost).classList.toggle("show");
    document.getElementById(idPost).classList.toggle("comment");
    
  }
  const btnToglComment = (idP)=> {
    let idPost = `comment-${idP}`
    document.getElementById(idPost).classList.toggle("show");
    
  }
  const displayModifPost =(itemP)=>{
    const item = itemP;
    setPostOnModif(item)

    
    if(onModif){
      setOnModif(false)
    }else{
      setOnModif(true)

    }
  }

  console.log(postOnModif.id_post)
  useEffect(() => {
    setUserCoId(pUserIdToken.user_id);
    const myHeaders = new Headers();

    const myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    fetch(url, myInit)
      .then(res => res.json())
      .then(
        (result) => {
          

          setIsLoaded(true);
          setItems(result.result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="side-post"> {
        <div className='cards'>{items.map(item => (
          
          <div id={`post-${item.id_post}`} key={Date.now()+((item.id_post+item.user_id)*2)} className='card-content'>
            <div className='header-post'>
              <img alt="Avatar Utilisateur" src={url.split("api")[0]+"images/avatars/"+item.avatar} className='avatar-on-post'/>
              <div className="post-name-date">
                <p className="post-name">{item.nom_post +' '+ item.prenom_post}</p>
                <p className="post-date">{item.date_post}</p>
              </div>
              <div className='parametre-post'>
                <button aria-label='settings' className="dropbtn" onClick={()=>btnTogl(item, item.id_post)}><i className="fas fa-ellipsis-h"></i></button>
              </div>
              <div className="parametre-post-open">
                  <div className="dropdown bkcol">
                    {userCoId == item.user_id ?
                    <div className="dropdown-content" id={`myDropdown-${item.id_post}`}>
                      <input type='button' className='btn-more-params-post' onClick={()=>displayModifPost(item)} href="../modify-post" value="modifier" />
                      <input type="button" className='btn-more-params-post' onClick={()=>DeletePost()} value='suprimer' />
                    </div> :
                      <div className="dropdown-content" id={`myDropdown-${item.id_post}`}>
                      <a className='btn-more-params-post' href="#">signaler</a>
                    </div>
                    }
                  </div>
                </div>
            </div>
            <div className="test">{item.id_post != postOnModif.id_post?
              <div className='content-post'>{item.content_post!=''&&
                <p className="text-post">{item.content_post}</p>}
                <div className="media_post">
                {item.url_web!= null && item.url_web!= "null" 
                ?
                <iframe 
                  className="iframe-media"
                  width="500"
                  height="400"
                  src={item.url_web!='undefined' ?item.url_web.split('watch?v=').join('embed/'):''}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen="allowfullscreen"
                >
                </iframe>
                :<div className="media-post">{item.image_post!= null && item.image_post!= "null" 
                ?<img width='500' height="400" className="iframe-media" alt='file post' src={item.image_post!='undefined' ?url.split('api')[0]+"images/posts/" + item.image_post:'' }/>
                  :<p>Il y a "R" Frère</p>
                  }
                  </div>
                  }
                </div>

                      
              </div>:<ModifPost />
              }
              </div>
              <div className='header-comment'>
                  <div className="like-unlike">
                    <button className='like'><i className="fas fa-heart"></i></button>
                    <button onClick={()=>btnToglComment(item.id_post)} className='btn-comment'><i className="far fa-comments"></i></button>
                  </div>
                    
              </div>
              <div className='comment-before'>
                <Comment id={`comment-${item.id_post}`} postId={item.id_post}/>
              </div>
            
          </div>
          
        ))}
      </div>
    }
    </div>
    );
  };
};
