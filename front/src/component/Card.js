import React,{ useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
//import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Comment from './Comment';

import '../styles/Card.css';


const url="http://localhost:3001/api/post/";

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(true);
  const [userCoId, setUserCoId] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const userIdToken = sessionStorage.getItem('token+id');
  const pUserIdToken = JSON.parse(userIdToken);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    
  };
  const btnTogl = (idP)=> {
    let idPost = `myDropdown-${idP}`
    document.getElementById(idPost).classList.toggle("show");
    document.getElementById(idPost).classList.toggle("comment");
    
    console.log(idPost)
  }
  const btnToglComment = (idP)=> {
    let idPost = `comment-${idP}`
    document.getElementById(idPost).classList.toggle("show");
    
    console.log(idPost)
  }
  
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
          console.log(result);
          // boucle de test
          result.result.forEach(it=>{(

            console.log("nom post", it.nom_post)
          )});

          setIsLoaded(true);
          setItems(result.result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

    console.log(items)
  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className='cards'>{items.map(item => (
        
        <div id={`post-${item.id_post}`} key={Date.now()+((item.id_post+item.user_id)*2)} className='card-content'>
          <div className='header-post'>
            <img alt="Avatar Utilisateur" src={url.split("api")[0]+"images/"+item.avatar} className='avatar-on-post'/>
            <div className="post-name-date">
              <p className="post-name">{item.nom_post +' '+ item.prenom_post}</p>
              <p className="post-date">{item.date_post}</p>
            </div>
            <div className='parametre-post'>
              <button aria-label='settings' className="dropbtn" onClick={()=>btnTogl(item.id_post)}><i className="fas fa-ellipsis-h"></i></button>
            </div>
            <div className="parametre-post-open">
                <div className="dropdown bkcol">
                  {userCoId == item.user_id ?
                  <div className="dropdown-content" id={`myDropdown-${item.id_post}`}>
                    <a className='btn-more-params-post' href="#">modifier</a>
                    <a className='btn-more-params-post' href="#">suprimer</a>
                  </div> :
                    <div className="dropdown-content" id={`myDropdown-${item.id_post}`}>
                    <a className='btn-more-params-post' href="#">signaler</a>
                  </div>
                  }
                </div>
              </div>
          </div>
          <div className='content-post'>
                  <p>{item.content_post}</p>
                  <div className="media_post">
                  {item.url_web!= null && item.url_web!= "null" 
                  ?<iframe 
                    className="iframe-media"
                    width="500"
                    height="350"
                    src={item.url_web!='undefined' ?item.url_web.split('watch?v=').join('embed/'):''}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen="allowfullscreen"
                  >
                  </iframe>
                  :<div>{item.image_url!= null && item.image_url!= "null" 
                  ?<iframe
                  className="iframe-media"

                   
                    src={item.image_url!='undefined' ?item.image_url:''}
                    allowfullscreen="allowfullscreen">
                      </iframe>
                    :<p>Il y a "R" Frère</p>
                    }
                    </div>
                  }
                  </div>
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
    );
  };
};
