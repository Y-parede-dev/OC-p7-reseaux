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

  const handleExpandClick = () => {
    setExpanded(!expanded);
    
  };
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
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

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className='cards'>{items.map(item => (
        //date.now
      
        <Card key={Date.now()+item.id_post}id={`${item.id_post}`} className='card-content'> 
        <CardHeader
          /*metre photo de profil comme avatar*/avatar={ 
            <img src={url.split("api")[0]+"images/"+item.avatar} className='avatar-on-post' /> 
            
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={item.nom_post +' '+ item.prenom_post}
          subheader="September 14, 2016"
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

    /*<ul>
          {items.map(item => (
            <li key={item.post_id}>
              {item.nom_post} {item.prenom_post} {item.post_content}
            </li>,
            <li>
              {item.nom_post} {item.prenom_post} {item.post_content}
            </li>
          ))}
        </ul>,*/