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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const url="http://localhost:3001/api/post/";

export default function RecipeReviewCard() {
  const classes = useStyles();
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
      <div className='cards'>{items.map(item => (
        //date.now
        
        <Card id={`post-${item.id_post}`} key={Date.now()+item.id_post+item.user_id} className='card-content'> 
        <CardHeader
          avatar={ 
            <img  alt='Avatar utilisateur' src={url.split("api")[0]+"images/"+item.avatar} className='avatar-on-post' /> 
            
          }
          action={
            <div>
            <IconButton 
                aria-label="settings"
                onClick={()=>btnTogl(item.id_post)}
                className='dropbtn'
              >
              <MoreVertIcon />
            </IconButton>
            <div>
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
          }
          title={item.nom_post +' '+ item.prenom_post}
          subheader={item.date_post}
        />
        <CardMedia
          className={classes.media}
          image='test' //  a modifier
          title="post"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.content_post}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Typography className="comment-title" paragraph>commentaires</Typography>

          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            id={item.post_id}

          >
            <ExpandMoreIcon />
          </IconButton>

        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comment postId={item.id_post}/>
          </CardContent>
        </Collapse>
      </Card>
      ))}
    </div>
    );
  };
};