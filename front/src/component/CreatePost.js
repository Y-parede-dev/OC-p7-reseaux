import { useState } from 'react';
import {contentPostOrModif} from '../assets/js/Function'
import '../styles/CreatePost.css';

const CreatePost=()=>{
    
    const [contentPost, setContentPost] = useState('');
    const [contentPostImg, setContentPostImg] = useState([]);
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    const scrollFixPos =()=>{
        let srll = sessionStorage.getItem('scroll');
        let elt = document.getElementById('form-create-post');

        if(srll){
            elt.className ='with-scroll'
        }
    }
        
    const handleChangeImg = (event) => {
        console.log(event.target.files[0])
        
        let imageData = event.target.files[0];
        setContentPostImg(imageData);
        
        console.log( imageData)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const datePost = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric', minute:'numeric' };
        const datePostString =datePost.toLocaleString('fr-Fr', options);
        
        const requete = new FormData();
        requete.append('user_id','');
        requete.append('content','');
        requete.append('date_post',datePostString);
        requete.append('image_url',null);
        requete.append('url_web',null);
        
        requete.set('user_id',PrecupUserCo.id);
         
        
        if(contentPostImg !=[]){
            requete.set('image_url', contentPostImg);
        }
        contentPostOrModif(contentPost, requete);
        
        const myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + userStorageJson.token);
            const myInit = { 
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: requete
            };
        fetch("http://localhost:3001/api/post", myInit)
        .then(res=>res.json())
        
        .catch(err=>console.log(err))
        window.location.href = "#form-create-post";
    }
    const handleChangeContent = (event) =>{
        setContentPost(event.target.value);
       
    }
    
  
   
    return(
    
        <form id="form-create-post" onLoad={scrollFixPos} onSubmit={handleSubmit}> 
            <p className="title-form-post">Souhaitez vous poster quelque chose ?</p>
            <label htmlFor="content-post"></label>
            <textarea className="form-control" type="text" name="content-post" value={contentPost} onChange={handleChangeContent}/>
            <label className="image-post-label" htmlFor='image-post'><i className="fas fa-image"></i></label>
            <input className="form-control image-post" type="file" name="image-post" accept="image/*" onChange={handleChangeImg} />
            
            <button className="form-control form-control-su" name="submit-login" type="submit">envoyer</button>

        </form>
        
    )
};
export default CreatePost;